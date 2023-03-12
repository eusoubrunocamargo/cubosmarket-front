import { useState, useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import jwtDecode from 'jwt-decode';

export function useAuth() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    console.log("entrou no useAuth");

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(!token){
            setIsAuthenticated(false);
            navigate('/');
            return;
        };

        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if(decodedToken.exp < currentTime){
            setIsAuthenticated(false);
            navigate('/');
        } else {
            setIsAuthenticated(true);
        };
    }, [navigate, location]);

    return isAuthenticated;

};
