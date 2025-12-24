'use client';

import { useState, useEffect } from 'react';
import { fetcher } from '@/lib/api';

type KnowledgeItem = {
  id: number;
  question: string;
  answer: string;
  is_active: boolean;
};

export default function ChatbotAdminPage() {
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ question: '', answer: '' });

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const data = await fetcher('/chatbot/knowledge');
      setItems(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question || !formData.answer) return;

    try {
      const newItem = await fetcher('/chatbot/knowledge', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      setItems([...items, newItem]);
      setFormData({ question: '', answer: '' });
      alert('Knowledge added!');
    } catch (error) {
      alert('Failed to add knowledge');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this item?')) return;
    try {
      await fetcher(`/chatbot/knowledge/${id}`, { method: 'DELETE' });
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      alert('Failed to delete');
    }
  };

  const handleReindex = async () => {
    try {
      const res = await fetcher('/chatbot/reindex', { method: 'POST' });
      alert(`Indexed ${res.indexed} chunks`);
    } catch (e) {
      alert('Failed to reindex');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="pb-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">AI Agent Knowledge Base</h1>
      
      {/* Add New Form */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Knowledge</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trigger Keywords / Question</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              placeholder="e.g., pricing, contact, services"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            />
            <p className="text-xs text-gray-500 mt-1">Separate keywords with spaces. If user message matches these, the answer will be triggered.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
            <textarea
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              rows={3}
              placeholder="The response the bot should give..."
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
            />
          </div>
          <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-light">
            Add to Knowledge Base
          </button>
        </form>
      </div>

      {/* List */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="flex justify-end p-4">
          <button onClick={handleReindex} className="bg-primary text-white px-4 py-2 rounded-lg">
            Reindex for AI
          </button>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Question / Keywords</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Answer</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.question}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{item.answer}</td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                  No knowledge added yet. Start by adding some questions!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
