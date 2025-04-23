import axios from 'axios';

const API = axios.create({
    baseURL: 'https://127.0.0.1:8000/api/',
    headers: {
        'Content-Type': 'application/json',
    }
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

API.interceptors.request.use((config) => {
    return config;
});

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(() => API(originalRequest));
            }

            isRefreshing = true;

            try {
                const response = await axios.post(
                    `https://127.0.0.1:8000/api/account/token/refresh/`,
                    {}, {withCredentials: true}
                );

                isRefreshing = false;
                processQueue(null);
                return API(originalRequest); // retry original request
            } catch (err) {
                isRefreshing = false;
                processQueue(err, null);

                // You can redirect or logout user here
                // window.location.href = '/auth';
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default API;
