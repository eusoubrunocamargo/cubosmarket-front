// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import jwtDecode from 'jwt-decode';

// export function useAuth() {

//     const [isAuthenticated, setIsAuthenticated] = useState(null);
//     const navigate = useNavigate();

//     console.log("entrou no useAuth");

//     useEffect(() => {

//         console.log("entrou no effect to auth");

//         const token = localStorage.getItem('token');

//         if(!token){
//             setIsAuthenticated(false);
//             navigate('/');
//             return;
//         };

//         const decodedToken = jwtDecode(token);
//         const currentTime = Date.now() / 1000;

//         console.log(decodedToken);
//         console.log(currentTime);

//         if(decodedToken.exp < currentTime){
//             console.log("token vencido, vai p /");
//             setIsAuthenticated(false);
//             navigate('/');
//         } else {
//             setIsAuthenticated(true);
//         };
//     }, []);

//     console.log(`Usuário autenticado: ${isAuthenticated}`);

//     return isAuthenticated;

// };
