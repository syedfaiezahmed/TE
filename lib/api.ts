export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const getAuthHeader = (): Record<string, string> => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
  return {};
};

const normalizeHeaders = (h?: HeadersInit): Record<string, string> => {
  if (!h) return {};
  if (h instanceof Headers) {
    const obj: Record<string, string> = {};
    h.forEach((v, k) => {
      obj[k] = v;
    });
    return obj;
  }
  if (Array.isArray(h)) {
    const obj: Record<string, string> = {};
    for (const [k, v] of h) {
      obj[k] = v;
    }
    return obj;
  }
  return h as Record<string, string>;
};

export const fetcher = async (url: string, options: RequestInit = {}) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
    ...normalizeHeaders(options.headers),
  };

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/admin/login';
      }
    }
    const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
    throw new Error(error.detail || 'An error occurred');
  }

  return response.json();
};
