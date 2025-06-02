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

export const getFavoriteRecipes = async () => {
    try {
        const response = await api.get('/api/recipe/favorites');
        return response.data;
    } catch (error) {
        console.error('Error obteniendo recetas favoritas:', error);
        throw error;
    }
};

export default api;