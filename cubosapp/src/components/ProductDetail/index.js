import { useContext, useState } from "react";
import { MyCartContext } from "../../utils/cartContext";
import { SuperModalContext } from "../../utils/modalContext";
import FastCart from '../../assets/fast_cart.png';
import "./styles.css";
import { toast } from 'react-toastify';

function ProductDetail({produto}) {

    const { setCurrentModal } = useContext(SuperModalContext);
    const { currentCart , setCurrentCart } = useContext(MyCartContext);
    const handleCloseButtonClick = () => {
        setCurrentModal(null);
    };

    const handleAddToCartButton = (produto) => {
        setCurrentCart([...currentCart, produto]);
        //alert("Produto adicionado ao carrinho!");
        toast.success('Produto adicionado ao carrinho!');
        handleCloseButtonClick();
    };

    const [currentImg, setCurrentImg] = useState(0);
    const handleImgClick = (index) => {
        setCurrentImg(index);
    };

    return (
        
        <>
            <>
            <div className="container-detalhe-produto">
                <div className="container-fotoprincipal-galeria">
                    <div className="container-fotoprincipal">
                        <img src={produto.urls[currentImg]} alt='foto'/>
                    </div>
                    {produto.urls.length > 1 && 
                    <div className="container-galeria">
                        {produto.urls.map((url, index) => {
                            return <img onClick={() => handleImgClick(index)} src={url} alt="foto" key={url}/>;
                        })}
                    </div>}
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
        </>
    )


}

export default ProductDetail;