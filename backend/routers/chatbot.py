import os
import json
import math
import uuid
import google.generativeai as genai
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from database import get_session
from models import ChatbotKnowledge, AdminUser, SiteContent, Product, EmbeddingDocument, ChatSession, ChatMessage
from auth import get_current_user
from pydantic import BaseModel

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-pro')
EMBED_MODEL = 'models/text-embedding-004'

router = APIRouter(prefix="/chatbot", tags=["Chatbot"])

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    answer: Optional[str] = None
    found: bool
    sources: Optional[List[dict]] = None
    session_id: str
    kind: str = "answer"
    suggestions: Optional[List[str]] = None

# --- Helper: Build Context from DB ---
def embed_text(text: str) -> List[float]:
    r = genai.embed_content(model=EMBED_MODEL, content=text)
    return r['embedding']

def cosine(a: List[float], b: List[float]) -> float:
    dp = sum(x*y for x, y in zip(a, b))
    na = math.sqrt(sum(x*x for x in a))
    nb = math.sqrt(sum(x*x for x in b))
    if na == 0 or nb == 0:
        return 0.0
    return dp / (na * nb)

def chunk(text: str, size: int = 1000, overlap: int = 200) -> List[str]:
    if len(text) <= size:
        return [text]
    chunks = []
    start = 0
    while start < len(text):
        end = min(start + size, len(text))
        chunks.append(text[start:end])
        if end == len(text):
            break
        start = max(0, end - overlap)
    return chunks

# --- Knowledge Base Management (Admin Only) ---

@router.post("/knowledge", response_model=ChatbotKnowledge)
def create_knowledge(item: ChatbotKnowledge, session: Session = Depends(get_session), current_user: AdminUser = Depends(get_current_user)):
    session.add(item)
    session.commit()
    session.refresh(item)
    return item

@router.get("/knowledge", response_model=List[ChatbotKnowledge])
def read_knowledge(session: Session = Depends(get_session), current_user: AdminUser = Depends(get_current_user)):
    return session.exec(select(ChatbotKnowledge)).all()

@router.delete("/knowledge/{item_id}")
def delete_knowledge(item_id: int, session: Session = Depends(get_session), current_user: AdminUser = Depends(get_current_user)):
    item = session.get(ChatbotKnowledge, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    session.delete(item)
    session.commit()
    return {"ok": True}

@router.post("/reindex")
def reindex(session: Session = Depends(get_session), current_user: AdminUser = Depends(get_current_user)):
    docs = session.exec(select(EmbeddingDocument)).all()
    for d in docs:
        session.delete(d)
    session.commit()
    items: List[tuple] = []
    include_kb = os.getenv("RAG_INCLUDE_KB", "false").lower() == "true"
    if include_kb:
        kb = session.exec(select(ChatbotKnowledge).where(ChatbotKnowledge.is_active == True)).all()
        for k in kb:
            for c in chunk(f"{k.question}\n{k.answer}"):
                items.append(("knowledge", str(k.id), c))
    content = session.exec(select(SiteContent)).all()
    for s in content:
        for c in chunk(f"{s.key}: {s.value}"):
            items.append(("content", s.key, c))
    products = session.exec(select(Product).where(Product.is_active == True)).all()
    for p in products:
        base = f"Product: {p.name}\nDescription: {p.description or ''}"
        for c in chunk(base):
            items.append(("product", str(p.id), c))
    for source_type, source_id, text in items:
        emb = embed_text(text)
        doc = EmbeddingDocument(source_type=source_type, source_id=source_id, text=text, embedding_json=json.dumps(emb))
        session.add(doc)
    session.commit()
    return {"indexed": len(items)}

@router.post("/ask", response_model=ChatResponse)
async def ask_chatbot(request: ChatRequest, session: Session = Depends(get_session)):
    q = request.message
    sid = request.session_id or str(uuid.uuid4())
    existing = session.exec(select(ChatSession).where(ChatSession.session_id == sid)).first()
    if not existing:
        session.add(ChatSession(session_id=sid))
        session.commit()
    session.add(ChatMessage(session_id=sid, role="user", content=q))
    session.commit()
    history_items: List[ChatMessage] = session.exec(
        select(ChatMessage).where(ChatMessage.session_id == sid).order_by(ChatMessage.created_at)
    ).all()
    history = []
    for h in history_items[-6:]:
        history.append(f"{h.role.capitalize()}: {h.content}")
    uq = q.lower()
    try:
        q_emb = embed_text(q)
    except Exception:
        q_emb = None
    include_kb = os.getenv("RAG_INCLUDE_KB", "false").lower() == "true"
    rows = session.exec(select(EmbeddingDocument)).all()
    rows = [r for r in rows if r.source_type in (("content", "product", "knowledge") if include_kb else ("content", "product"))]
    if not rows:
        content_items = session.exec(select(SiteContent)).all()
        products = session.exec(select(Product).where(Product.is_active == True)).all()
        kb_items = session.exec(select(ChatbotKnowledge).where(ChatbotKnowledge.is_active == True)).all() if include_kb else []
        context = ""
        if content_items:
            context += "SITE CONTENT:\n" + "\n".join([f"{c.key}: {c.value}" for c in content_items]) + "\n\n"
        if products:
            context += "PRODUCTS:\n" + "\n".join([f"{p.name}: {p.description or ''}" for p in products])
        if kb_items:
            context += "\n\nKNOWLEDGE:\n" + "\n\n".join([f"Q: {k.question}\nA: {k.answer}" for k in kb_items])
        if not context.strip():
            return {"answer": None, "found": False, "sources": [], "session_id": sid}
        sys = (
            "You are a helpful and professional AI Support Agent for Trans Emirates Company. "
            "Use only the following context to answer the user. "
            "If the answer is not present, say: I don't have that information."
        )
        prior = ("\n\nPrior conversation:\n" + "\n".join(history)) if history else ""
        prompt = f"{sys}\n\nContext:\n{context}{prior}\n\nUser:\n{q}"
        try:
            resp = model.generate_content(prompt)
            ans = resp.text.strip()
            if "I don't have that information" in ans or "I do not have" in ans:
                raise RuntimeError("Model did not find grounded answer")
            srcs = []
            session.add(ChatMessage(session_id=sid, role="assistant", content=ans))
            session.commit()
            return {"answer": ans, "found": True, "sources": srcs, "session_id": sid, "kind": "answer", "suggestions": ["About TE", "Our Products", "Contact Details"]}
        except Exception:
            pass
    top = []
    if q_emb is not None and rows:
        scored = []
        for r in rows:
            emb = json.loads(r.embedding_json)
            s = cosine(q_emb, emb)
            scored.append((s, r))
        scored.sort(key=lambda x: x[0], reverse=True)
        top = [r for s, r in scored[:5] if s > 0.2]
    kb_context_parts: List[str] = []
    kb_srcs: List[dict] = []
    if not include_kb and q_emb is not None:
        kb_items = session.exec(select(ChatbotKnowledge).where(ChatbotKnowledge.is_active == True)).all()
        kb_scored = []
        for k in kb_items:
            try:
                emb = embed_text(f"{k.question}\n{k.answer}")
                s = cosine(q_emb, emb)
                kb_scored.append((s, k))
            except Exception:
                continue
        kb_scored.sort(key=lambda x: x[0], reverse=True)
        kb_top = [k for s, k in kb_scored[:3] if s > 0.25]
        for k in kb_top:
            kb_context_parts.append(f"Q: {k.question}\nA: {k.answer}")
            kb_srcs.append({"source_type": "knowledge", "source_id": str(k.id) if k.id is not None else None})
    if not top:
        content_items = session.exec(select(SiteContent)).all()
        products = session.exec(select(Product).where(Product.is_active == True)).all()
        context = ""
        if content_items:
            context += "SITE CONTENT:\n" + "\n".join([f"{c.key}: {c.value}" for c in content_items]) + "\n\n"
        if products:
            context += "PRODUCTS:\n" + "\n".join([f"{p.name}: {p.description or ''}" for p in products])
        if kb_context_parts:
            context += "\n\nKNOWLEDGE:\n" + "\n\n".join(kb_context_parts)
        if not context.strip():
            return {"answer": None, "found": False, "sources": [], "session_id": sid}
    else:
        context = "\n\n".join([t.text for t in top] + (kb_context_parts if kb_context_parts else []))
    sys = (
        "You are a helpful and professional AI Support Agent for Trans Emirates Company. "
        "Use only the following context to answer the user. "
        "If the answer is not present, say: I don't have that information."
    )
    prior = ("\n\nPrior conversation:\n" + "\n".join(history)) if history else ""
    prompt = f"{sys}\n\nContext:\n{context}{prior}\n\nUser:\n{q}"
    try:
        resp = model.generate_content(prompt)
        ans = resp.text.strip()
        if "I don't have that information" in ans or "I do not have" in ans:
            raise RuntimeError("Model did not find grounded answer")
        srcs = [{"source_type": t.source_type, "source_id": t.source_id} for t in top] + kb_srcs
        session.add(ChatMessage(session_id=sid, role="assistant", content=ans))
        session.commit()
        return {"answer": ans, "found": True, "sources": srcs, "session_id": sid, "kind": "answer", "suggestions": ["Ask about services", "Show contact details"]}
    except Exception:
        # Greetings fallback
        greet_terms = ["hi", "hello", "hey", "salam", "assalam", "assalamu", "assalam o alaikum", "asalam"]
        if any(g in uq for g in greet_terms):
            ans = "Hi! How can I help you today? You can ask about our company, services, or products."
            session.add(ChatMessage(session_id=sid, role="assistant", content=ans))
            session.commit()
            return {"answer": ans, "found": True, "sources": [], "session_id": sid, "kind": "greeting", "suggestions": ["About TE", "Our Products", "Contact Details"]}
        # Clarification for pricing/services/product queries
        ambiguous_terms = ["price", "cost", "service", "services", "product", "products", "range"]
        if any(term in uq for term in ambiguous_terms):
            ans = "Do you want details about a specific product or our services? Please specify."
            session.add(ChatMessage(session_id=sid, role="assistant", content=ans))
            session.commit()
            return {"answer": ans, "found": True, "sources": [], "session_id": sid, "kind": "clarification", "suggestions": ["Product: Petroleum Jelly", "Product: Base Oil", "Our Services", "Contact Team"]}
        # Simple deterministic fallbacks from SiteContent
        about_item = session.get(SiteContent, "about")
        if about_item and ("what is te" in uq or "trans emirates" in uq or "about" in uq):
            ans = about_item.value
            session.add(ChatMessage(session_id=sid, role="assistant", content=ans))
            session.commit()
            return {"answer": ans, "found": True, "sources": [{"source_type": "content", "source_id": "about"}], "session_id": sid, "kind": "answer", "suggestions": ["Our Products", "Contact Details"]}
        # Contact details fallback
        keys = ["phone", "email", "address", "contact"]
        if any(k in uq for k in keys):
            content_items = session.exec(select(SiteContent)).all()
            details = []
            for k in ["phone", "email", "address"]:
                it = session.get(SiteContent, k)
                if it:
                    details.append(f"{k.capitalize()}: {it.value}")
            if details:
                ans = "\n".join(details)
                session.add(ChatMessage(session_id=sid, role="assistant", content=ans))
                session.commit()
                return {"answer": ans, "found": True, "sources": [{"source_type": "content", "source_id": "contact"}], "session_id": sid, "kind": "answer", "suggestions": ["Ask for a callback", "About TE"]}
        # Knowledge base keyword match
        kb = session.exec(select(ChatbotKnowledge).where(ChatbotKnowledge.is_active == True)).all()
        for item in kb:
            qwords = item.question.lower().split()
            if any(w in uq for w in qwords):
                ans = item.answer
                session.add(ChatMessage(session_id=sid, role="assistant", content=ans))
                session.commit()
                return {"answer": ans, "found": True, "sources": [{"source_type": "knowledge", "source_id": str(item.id)}], "session_id": sid, "kind": "answer", "suggestions": ["More details", "Contact Team"]}
        return {"answer": None, "found": False, "sources": [], "session_id": sid, "kind": "fallback", "suggestions": ["Contact Team", "About TE", "Our Products"]}
