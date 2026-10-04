import axios from 'axios';

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const API_BASE_URL = configuredApiUrl
    ? `${configuredApiUrl.replace(/\/+$/, '')}${/\/api$/i.test(configuredApiUrl.replace(/\/+$/, '')) ? '' : '/api'}`
    : '/api';

// Create an axios instance to handle base URL and interceptors
const api = axios.create({
    baseURL: API_BASE_URL,
});

// Request interceptor to automatically attach JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('studymate-token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle 401 Unauthorized globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('studymate-token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const pdfService = {
    uploadPdf: async (file) => {
        const formData = new FormData();
        formData.append('pdf', file);
        const response = await api.post('/pdf/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },
    analyzePdf: async (fileName, originalName) => {
        const response = await api.post('/pdf/analyze', { fileName, originalName });
        return response.data;
    }
};

export const aiService = {
    generateNotes: async (text) => {
        const response = await api.post('/ai/notes', { text });
        return response.data;
    },
    generateTopics: async (text) => {
        const response = await api.post('/ai/topics', { text });
        return response.data;
    },
    generateMCQs: async (text, count, difficulty) => {
        const response = await api.post('/ai/mcqs', { text, count, difficulty });
        return response.data;
    }
};

export const studyService = {
    getUserStudies: async () => {
        const response = await api.get('/studies');
        return response.data;
    },
    getStudyById: async (id) => {
        const response = await api.get(`/studies/${id}`);
        return response.data;
    },
    updateStudy: async (id, data) => {
        const response = await api.put(`/studies/${id}`, data);
        return response.data;
    },
    deleteStudy: async (id) => {
        const response = await api.delete(`/studies/${id}`);
        return response.data;
    }
};

export const quizAttemptService = {
    create: async (attempt) => (await api.post('/quiz-attempts', attempt)).data,
    getHistory: async () => (await api.get('/quiz-attempts')).data
};

export const analyticsService = {
    getStudyAnalytics: async () => (await api.get('/analytics')).data
};

export const authService = {
    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },
    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },
    getProfile: async () => {
        const response = await api.get('/auth/profile');
        return response.data;
    },
    updateProfile: async (data) => {
        const response = await api.put('/auth/profile', data);
        return response.data;
    },
    changePassword: async (data) => {
        const response = await api.put('/auth/change-password', data);
        return response.data;
    }
};

export default api;
