import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000', // 백엔드 URL
    withCredentials: true, // 쿠키 포함 요청 가능
});

export default api;