import { useContext } from "react";
import { MyCartContext } from "../../utils/cartContext";
import { SuperModalContext } from "../../utils/modalContext";
import FastCart from '../../assets/fast_cart.png';
import "./styles.css";

function ProductDetail({produto}) {

    const { setCurrentModal } = useContext(SuperModalContext);
    const { currentCart , setCurrentCart } = useContext(MyCartContext);
    const handleCloseButtonClick = () => {
        setCurrentModal(null);
    };

    const handleAddToCartButton = (produto) => {
        setCurrentCart([...currentCart, produto]);
        alert("Produto adicionado ao carrinho!");
        handleCloseButtonClick();
    };

    return (
        
        <>
            <div className="container-detalhe-produto">
                <div className="container-fotoprincipal-galeria">
                    <div className="container-fotoprincipal">
                        <img src={produto.imagem_url} alt='foto'/>
                    </div>
                    <div className="container-galeria">
                        <img src={produto.imagem_url} alt='foto'/>
                        <img src={produto.imagem_url} alt='foto'/>
                        <img src={produto.imagem_url} alt='foto'/>
                    </div>
                </div>
                <div className="container-descricao">{produto.descricao}</div>
                <div className="container-btn-comprar">
                    <div className="container-preco-style">
                        <div>QUANTO</div>
                        <div>R${produto.preco}</div>
                    </div>
                    <div className="container-btn-toCart-toCheckout">
                    <button onClick={() => handleAddToCartButton(produto)} className="btn-add-to-cart">Adicionar ao carrinho</button>
                    <button onClick={handleCloseButtonClick} className="btn-toCheckout"><img src={FastCart} alt='cart'/> Comprar agora!</button>
                    </div>
                </div>    
            </div>
        </>
    )


}

export default ProductDetail;