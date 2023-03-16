import { createContext, useContext, useState , useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
};

export function AuthProvider({children}) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(()=> {
        console.log('entrou no useeffect');
        const authToken = localStorage.getItem('token');
        if(authToken){
            setIsAuthenticated(true);
        };
    }, []);

    useEffect(() => {
        const handleStorageChange = (e) => {
          if (e.key === "token" && !e.newValue) {
            setIsAuthenticated(false);
          }
        };
    
        window.addEventListener("storage", handleStorageChange);
        return () => {
          window.removeEventListener("storage", handleStorageChange);
        };
      }, []);

    function login(payload){
    api.post('/login', payload)
        .then(response => {
            localStorage.setItem('nome', response.data.nome);
            localStorage.setItem('id', response.data.id);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('loja_cadastrada', response.data.loja_cadastrada);
                if(response.data.marketname){
                localStorage.setItem("nome_loja",response.data.marketname);
                };
            setIsAuthenticated(true);
            alert(response.data.mensagem);
        })
        .catch(error => {
            console.log(error);
            setIsAuthenticated(false);
        });
    };

    function logout(){
        setIsAuthenticated(false);
        localStorage.clear();
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );

};