import axios from 'axios';

// Aca va la URL de la API cuando se tenga el backend solo se cambia la url
const api = axios.create({
    baseURL:"http://localhost:3000",
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Interceptor para añadir el token a cada solicitud
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Obtener el token del localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Añadir el token al encabezado de autorización
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;