import { useContext } from "react";
import User from "../../assets/user.svg";
import { SuperModalContext } from "../../utils/modalContext";
import "./styles.css";
import { useAuth } from "../../utils/authContext";

function SetUser() {

    const { logout } = useAuth();
    const { setCurrentModal } = useContext(SuperModalContext);
    const handleCloseButtonClick = () => {
        logout();
        setCurrentModal(null);
    };

    return (
        
        <>
            <div className="container-carrinho-vazio">
                <button className="btn-fechar-modal" onClick={()=>setCurrentModal(null)}>X</button>
                <img src={User} alt="usuário" /> 
                O que você quer fazer?
                <button onClick={handleCloseButtonClick}className="btn-continuar-comprando">
                Editar meu dados
                </button>
                <button style={{backgroundColor: 'GrayText'}} onClick={handleCloseButtonClick}className="btn-continuar-comprando">
                Sair
                </button>
            </div>
        </>
    )


}

export default SetUser;