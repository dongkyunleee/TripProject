import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5173', // 백엔드 URL
    credentials: true,
});

export default api;