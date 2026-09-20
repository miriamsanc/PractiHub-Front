import axios from 'axios';

const api = axios.create({
    // Asegúrate de que este sea el puerto donde corre tu Laravel en D:\herdprojects
    baseURL: import.meta.env.VITE_API_URL || 'https://practihub-api-rest.test/api', 
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Interceptor para inyectar el Token si el usuario ha iniciado sesión
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // Cuando el body es un FormData (subida de fichero, ej. el CV), dejamos que el
    // navegador ponga el Content-Type correcto (multipart/form-data con boundary).
    // Si forzamos 'application/json' aquí, Laravel no podrá leer el fichero.
    if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
    }
    
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;