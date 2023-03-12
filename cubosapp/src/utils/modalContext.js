import { createContext , useState } from "react";

export const SuperModalContext = createContext(null);

export const SuperModalProvider = ({children}) => {
    
    const [currentModal, setCurrentModal] = useState(null);
    
    return (
        <SuperModalContext.Provider 
        value={{currentModal, setCurrentModal}}>
            {children}
        </SuperModalContext.Provider>
    );
};
