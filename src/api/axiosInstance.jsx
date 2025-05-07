import axios from 'axios';


let isRefreshing = false;
let refreshSubscribers = [];

const onAccessTokenFetched = () => {
    refreshSubscribers.forEach((callback) => callback());
    refreshSubscribers = [];
};

const subscribeTokenRefresh = (callback) => {
    refreshSubscribers.push(callback);
};

const API = axios.create({
    baseURL: 'https://127.0.0.1:8000/api/',
    // baseURL: 'https://192.168.43.67:8000/api/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    subscribeTokenRefresh(() => resolve(API(originalRequest)));
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                await API.get('/account/token/refresh/', {
                    withCredentials: true,
                });

                isRefreshing = false;
                onAccessTokenFetched();
                return API(originalRequest);
            } catch (refreshError) {
                isRefreshing = false;    
                // window.location.href = '/auth'; 
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default API;
