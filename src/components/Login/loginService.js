import axios from 'axios';

const API_URL = axios.create({
    baseURL: 'http://localhost:3000', // 백엔드 URL
    withCredentials: true,           // 쿠키 전송 허용
});

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Login failed');
    }
};