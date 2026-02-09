'use client';

import { useState, useEffect } from 'react';
import { fetcher } from '@/lib/api';

interface MediaAsset {
  id: number;
  filename: string;
  url: string;
  file_type: string;
  uploaded_at: string;
}

export default function MediaLibrary() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    try {
      const data = await fetcher('/media');
      setAssets(data);
    } catch (error) {
      console.error('Failed to load media', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    setUploading(true);
    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    try {
      // Need to use native fetch for FormData since our wrapper assumes JSON
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/media/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      if (!res.ok) throw new Error('Upload failed');
      
      const newAsset = await res.json();
      setAssets([newAsset, ...assets]);
    } catch (error) {
      console.error('Upload error', error);
      alert('Failed to upload file');
    } finally {
      setUploading(false);
      // Reset input
      e.target.value = '';
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure? This will break any links to this file.')) return;
    try {
      await fetcher(`/media/${id}`, { method: 'DELETE' });
      setAssets(assets.filter(a => a.id !== id));
    } catch (error) {
      alert('Failed to delete asset');
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('URL copied to clipboard!');
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Media Library</h1>
        <div className="relative">
          <input
            type="file"
            onChange={handleUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/*,application/pdf"
            disabled={uploading}
          />
          <button className={`bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition ${uploading ? 'opacity-50' : ''}`}>
            {uploading ? 'Uploading...' : '+ Upload File'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {assets.map((asset) => (
          <div key={asset.id} className="group relative bg-white rounded-xl shadow-sm border overflow-hidden aspect-square flex flex-col">
            <div className="flex-1 bg-gray-100 flex items-center justify-center overflow-hidden">
              {asset.file_type.startsWith('image/') ? (
                <img src={asset.url} alt={asset.filename} className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl">📄</span>
              )}
            </div>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-2 p-4">
              <button 
                onClick={() => copyToClipboard(asset.url)}
                className="bg-white text-gray-900 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 w-full"
              >
                Copy URL
              </button>
              <button 
                onClick={() => handleDelete(asset.id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm font-medium hover:bg-red-600 w-full"
              >
                Delete
              </button>
            </div>

            <div className="p-2 bg-white border-t text-xs text-gray-600 truncate">
              {asset.filename}
            </div>
          </div>
        ))}
        {assets.length === 0 && (
          <div className="col-span-full p-12 text-center text-gray-500 border-2 border-dashed rounded-xl">
            No media files found. Upload some to get started.
          </div>
        )}
      </div>
    </div>
  );
}
