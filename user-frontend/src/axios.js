import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3001/api/shop/' });

// Thêm header Authorization cho mỗi request
API.interceptors.request.use((config) => {
	const token = localStorage.getItem('token'); // Lấy token từ localStorage hoặc nơi lưu trữ khác
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
}, (error) => {
	return Promise.reject(error);
});

export default API;