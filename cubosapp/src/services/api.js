import axios from "axios";
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


const api = axios.create({
    //baseURL: 'http://localhost:8080',
    baseURL: 'https://cubosmarket-back.herokuapp.com/',
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
    (config) => {
        try {
            console.log('entrou no interceptor');
            const token = localStorage.getItem('token');
            if(token){
                try {
                    const decodedToken = jwtDecode(token);
                    const currentTime = Date.now() / 1000;
                    if(decodedToken.exp > currentTime){
                        config.headers.Authorization = `Bearer ${token}`;
                    } else {
                    localStorage.clear();
                    alert('Você não está logado, faça login!');
                    window.location.reload();
                    const navigate = useNavigate();
                    navigate('/');
                    }
                } catch (error) {
                    console.error('Token inválido:', error);
                }
            }
        } catch (error) {
            console.error(error);
        }

        return config;

    }, (error) => {
        return Promise.reject(error);
    }
);
    
export default api;

