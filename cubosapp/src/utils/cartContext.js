import { createContext , useState } from "react";

export const MyCartContext = createContext([]);

export const MyCartProvider = ({children}) => {
    
    const [currentCart, setCurrentCart] = useState([]);
    
    return (
        <MyCartContext.Provider 
        value={{currentCart, setCurrentCart}}>
            {children}
        </MyCartContext.Provider>
    );
};
