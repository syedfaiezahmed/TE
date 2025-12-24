'use client';

import { useState, useRef, useEffect } from 'react';
import { fetcher } from '@/lib/api';

type Message = {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  type?: 'text' | 'form' | 'satisfaction';
  sources?: { source_type: string; source_id?: string }[];
  kind?: 'answer' | 'greeting' | 'clarification' | 'fallback';
  suggestions?: string[];
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'bot', text: 'Hi! How can I help you today?', type: 'text' }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  
  // Form State for Fallback/Success
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [formStep, setFormStep] = useState<'idle' | 'fallback' | 'success'>('idle');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: inputText, type: 'text' };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const res = await fetcher('/chatbot/ask', {
        method: 'POST',
        body: JSON.stringify({ message: userMsg.text, session_id: sessionId ?? undefined })
      });

      if (res.session_id && !sessionId) {
        setSessionId(res.session_id);
      }
      if (res.found) {
        const shouldAskSatisfaction =
          res &&
          res.kind === 'answer' &&
          Array.isArray(res.sources) &&
          res.sources.length > 0;
        setMessages(prev => [
          ...prev, 
          { id: Date.now().toString(), sender: 'bot', text: String(res.answer ?? ''), type: 'text', sources: Array.isArray(res.sources) ? res.sources : [], kind: typeof res.kind === 'string' ? res.kind : 'answer', suggestions: Array.isArray(res.suggestions) ? res.suggestions : [] },
          ...(shouldAskSatisfaction ? [
            { id: (Date.now() + 1).toString(), sender: 'bot', text: 'Was this information helpful?', type: 'satisfaction' }
          ] : [])
        ]);
      } else {
        setMessages(prev => [
          ...prev, 
          { id: Date.now().toString(), sender: 'bot', text: "I'm sorry, I don't have that information right now. Please provide your name and number, and our team will contact you shortly.", type: 'form' }
        ]);
        setFormStep('fallback');
      }
    } catch {
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'bot', text: "Sorry, something went wrong. Please try again later.", type: 'text' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSatisfaction = (satisfied: boolean) => {
    if (satisfied) {
      setMessages(prev => [
        ...prev, 
        { id: Date.now().toString(), sender: 'bot', text: "Great! Please provide your name and number so we can record your satisfaction and proceed further.", type: 'form' }
      ]);
      setFormStep('success');
    } else {
       setMessages(prev => [
        ...prev, 
        { id: Date.now().toString(), sender: 'bot', text: "I see. Please provide your name and number, and a human agent will contact you to assist better.", type: 'form' }
      ]);
      setFormStep('fallback');
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setLoading(true);
    try {
      const inquiryType = formStep === 'success' ? 'Chatbot - Satisfied' : 'Chatbot - Fallback';
      const lastUserMessage = messages.filter(m => m.sender === 'user').pop()?.text || "No message";
      
      await fetcher('/inquiries/', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name,
          email: 'chatbot@user.com', // Placeholder or ask for email too
          phone: formData.phone,
          message: `[${inquiryType}] User Query: ${lastUserMessage}`,
          inquiry_type: inquiryType
        })
      });

      setMessages(prev => [
        ...prev, 
        { id: Date.now().toString(), sender: 'bot', text: "Thank you! We have received your details and will be in touch soon.", type: 'text' }
      ]);
      setFormStep('idle');
      setFormData({ name: '', phone: '' });

    } catch {
       setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'bot', text: "Failed to save details. Please try contacting us via the Contact page.", type: 'text' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-light transition-all z-50 flex items-center justify-center"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        )}
      </button>

      {/* Chat Window */}
          {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 flex flex-col overflow-hidden h-[500px] animate-chat-in">
          {/* Header */}
          <div className="bg-primary p-4 text-white flex justify-between items-center">
            <h3 className="font-bold">TE Support Agent</h3>
            <span className="text-xs bg-white/20 px-2 py-1 rounded">AI Powered</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  msg.sender === 'user' 
                    ? 'bg-primary text-white rounded-br-none' 
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                }`}>
                  {msg.text}
                  {msg.sender === 'bot' && msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2 text-[11px] text-gray-500">
                      Sources: {msg.sources.map((s) => `${s.source_type}${s.source_id ? `:${s.source_id}` : ''}`).join(', ')}
                    </div>
                  )}
                  {msg.sender === 'bot' && msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {msg.suggestions.map((sug) => (
                        <button
                          key={sug}
                          onClick={() => {
                            setInputText(sug);
                            // optional: auto send
                            // setTimeout(() => handleSend(), 0);
                          }}
                          className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Loading Indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Satisfaction Buttons */}
            {messages.length > 0 && messages[messages.length - 1].type === 'satisfaction' && (
              <div className="flex gap-2 justify-center mt-2">
                <button onClick={() => handleSatisfaction(true)} className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition">Yes, thanks!</button>
                <button onClick={() => handleSatisfaction(false)} className="px-4 py-2 bg-gray-500 text-white rounded-lg text-sm hover:bg-gray-600 transition">No, need help</button>
              </div>
            )}

            {/* Contact Form */}
            {formStep !== 'idle' && !loading && messages[messages.length - 1].type === 'form' && (
               <form onSubmit={handleFormSubmit} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm space-y-3 mt-2">
                 <input 
                   type="text" 
                   placeholder="Your Name" 
                   required
                   className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-primary outline-none"
                   value={formData.name}
                   onChange={e => setFormData({...formData, name: e.target.value})}
                 />
                 <input 
                   type="tel" 
                   placeholder="Your Phone Number" 
                   required
                   className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-primary outline-none"
                   value={formData.phone}
                   onChange={e => setFormData({...formData, phone: e.target.value})}
                 />
                 <button type="submit" className="w-full bg-primary text-white py-2 rounded text-sm hover:bg-primary-light">
                   Submit Details
                 </button>
               </form>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your question..."
                disabled={formStep !== 'idle'} // Disable input when form is active
                className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-sm"
              />
              <button 
                onClick={handleSend}
                disabled={formStep !== 'idle' || !inputText.trim()}
                className="bg-primary text-white p-2 rounded-lg hover:bg-primary-light disabled:opacity-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
