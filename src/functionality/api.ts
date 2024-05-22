import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        const type = localStorage.getItem('type');
        if (token) {
            config.headers.Authorization = `${type} ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (!originalRequest._retry) {
            originalRequest._retry = true;

            try {
                console.log("refresh");
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axios.post('http://localhost:8080/api/auth/token', { 'refreshToken': refreshToken });
                const { accessToken } = response.data;
                localStorage.setItem('token', accessToken);

                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return axios(originalRequest);
            } catch (error) {
                console.log("Refresh token error!")
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export default api