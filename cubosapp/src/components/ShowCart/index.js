import { useContext } from "react";
import Carrinho from "../../assets/carrinho.svg";
import { SuperModalContext } from "../../utils/modalContext";
import "./styles.css";
// import { useState } from "react";

function ShowCart() {

    const { setCurrentModal } = useContext(SuperModalContext);
    const handleCloseButtonClick = () => {
        setCurrentModal(null);
    };


    //const [cart, setCart] = useState([]);

    return (
        // cart.length > 0 ? 
        // <>
        //     <div>
        //     <img src={Carrinho} alt="Carrinho" />
        //     Carrinho cheio...
        //     </div>
        // </> :
        <>
            <div className="container-carrinho-vazio">
                <img src={Carrinho} alt="Carrinho" /> 
                Seu carrinho está vazio!
                <button onClick={handleCloseButtonClick}className="btn-continuar-comprando">
                Continuar comprando
                </button>
            </div>
        </>
    )


}

export default ShowCart;