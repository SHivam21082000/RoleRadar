import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor — attach JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — handle 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// ── Auth API ──
export const authApi = {
  login:    (data) => api.post('/v1/auth/login', data),
  register: (data) => api.post('/v1/auth/register', data),
  me:       ()     => api.get('/v1/auth/me'),
  refresh:  ()     => api.post('/v1/auth/refresh'),
};

// ── Resume API ──
export const resumeApi = {
  list:   ()       => api.get('/v1/resumes'),
  get:    (id)     => api.get(`/v1/resumes/${id}`),
  upload: (file)   => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/v1/resumes/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  create: (data)   => api.post('/v1/resumes/create', data),
  update: (id, d)  => api.put(`/v1/resumes/${id}`, d),
  delete: (id)     => api.delete(`/v1/resumes/${id}`),
};

// ── Job API ──
export const jobApi = {
  search:   (params) => api.get('/v1/jobs', { params }),
  get:      (id)     => api.get(`/v1/jobs/${id}`),
  matches:  (params) => api.get('/v1/jobs/matches', { params }),
  dismiss:  (id)     => api.post(`/v1/jobs/${id}/dismiss`),
  save:     (id)     => api.post(`/v1/jobs/${id}/save`),
};

// ── Application API ──
export const applicationApi = {
  list:         ()       => api.get('/v1/applications'),
  create:       (data)   => api.post('/v1/applications', data),
  updateStatus: (id, s)  => api.put(`/v1/applications/${id}/status`, { status: s }),
  delete:       (id)     => api.delete(`/v1/applications/${id}`),
};

// ── AI API ──
export const aiApi = {
  coverLetter: (data) => api.post('/v1/ai/cover-letter', data),
  skillGap:    (data) => api.post('/v1/ai/skill-gap', data),
  jobInsights: (data) => api.post('/v1/ai/job-insights', data),
};

// ── Analytics API ──
export const analyticsApi = {
  dashboard: () => api.get('/v1/analytics/dashboard'),
  trends:    () => api.get('/v1/analytics/trends'),
  funnel:    () => api.get('/v1/analytics/funnel'),
};
