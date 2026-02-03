import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://ramayana.hindbiswas.com/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = '16|SkKVGIlI31ZNogFVq4KeznXxsGJhkADoPBmXxW4o83a79603';
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;