import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true, // CRITICAL: Allows the browser to send and receive the HTTP-Only cookie
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request interceptor to add the auth token to headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
    (response) => {
        // Return response directly if successful
        return response;
    },
    (error) => {
        // If the backend returns 401 (Token missing, invalid, or expired in Redis)
        if (error.response && error.response.status === 401) {

            // 1. Clear any user info you have stored in localStorage/sessionStorage
            localStorage.removeItem('lt_user');
            localStorage.removeItem('authToken');

            // 2. Redirect to login page only if the user isn't already there
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default api;
