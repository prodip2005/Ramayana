import axios from 'axios';
import { getAuth } from 'firebase/auth';

const axiosSecure = axios.create({
    baseURL: 'https://ramayana-server.vercel.app'
});

axiosSecure.interceptors.request.use(async (config) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        const token = await user.getIdToken();
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosSecure;