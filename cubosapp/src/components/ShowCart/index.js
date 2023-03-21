import { useContext , useRef, useState } from "react";
import { MyCartContext } from "../../utils/cartContext";
import { SuperModalContext } from "../../utils/modalContext";
import "./styles.css";

//assets
import ArrowDown from '../../assets/arrowdown.png';
import ArrowUp from '../../assets/arrowup.png';
import BtnSomar from '../../assets/btn_somar.png';
import BtnSubtrair from '../../assets/btn_subtrair.png';
import Carrinho from "../../assets/carrinho.svg";


function ShowCart() {

    const parentRef = useRef();

    const handleScrollUp = () => {
        parentRef.current.scrollTop -= 10;
    };

    const handleScrollDown = () => {
        parentRef.current.scrollTop += 10;
    };

    const { setCurrentModal } = useContext(SuperModalContext);
    const handleCloseButtonClick = () => {
        setCurrentModal(null);
    };

    const { currentCart , setCurrentCart } = useContext(MyCartContext);
    //console.log(currentCart);

    const groupProducts = (cart) => {
        return cart.reduce((grouped, produto) => {
            const existingProduct = grouped.find((p) => p.id === produto.id);

            if(existingProduct){
                existingProduct.quantity += 1;
            } else {
                grouped.push({ ...produto, quantity: 1});
            }

            return grouped;
        }, []);
    };

    const handleAddProduto = (produto) => {
        setItemToRemove(null);
        setCurrentCart([...currentCart, produto]);
    };

    const [itemToRemove, setItemToRemove] = useState(null);

    const handleSubProduto = (produto, index) => {
        
        //console.log(index);

        const qtdProduto = currentCart.reduce((count, item) => {
            if(item.id === produto.id){
                return count + 1;
            }
            return count;
        }, 0);

        if(qtdProduto === 1){
            setItemToRemove(index);
        } else {
            const indexFirstToRemove = currentCart.findIndex((item) => item.id === produto.id);
            const newCart = currentCart.filter((_,index) => index !== indexFirstToRemove);
            setCurrentCart(newCart);
        }
    }

    const handleRemove = (indexToRemove) => {
        const newCart = currentCart.filter((_, index) => index !== indexToRemove);
        setCurrentCart(newCart);
        setItemToRemove(null);
    };

    const totalPrice = currentCart.reduce((acc, produto) => {
        return acc + produto.preco;
    }, 0);

    //console.log(groupProducts(currentCart));


    return (
        
        <>
            {currentCart.length === 0 ? (
            <div className="container-carrinho-vazio">
                <img src={Carrinho} alt="Carrinho" /> 
                Seu carrinho está vazio!
                <button onClick={handleCloseButtonClick}className="btn-continuar-comprando">
                Continuar comprando
                </button>
            </div>
            ) : (
            <div className='container-carrinho-cheio'>
                <div className='container-lista-produtos' ref={parentRef}>
                    {groupProducts(currentCart).map((produto, index) => {
                        //console.log(index);
                        return (
                            <div key={produto.id} className='container-cada-produto'>
                                {(itemToRemove === index) && (
                                <button onClick={()=> handleRemove(index)} className="btn-remover">remover</button>)}
                                <div className="container-qtd-nome">
                                <div className="container-controle-qtd">
                                    <div  onClick={() => handleAddProduto(produto)} className="btn-qtd"><img src={BtnSomar} alt='somar'/></div>
                                    <div className="qtd-produto">{produto.quantity}</div>
                                    <div onClick={() => handleSubProduto(produto, index)} className="btn-qtd"><img src={BtnSubtrair} alt='subtrair'/></div>
                                </div>
                                <div className="container-foto-pequena"><img src={produto.urls[0]} alt='imagem'/></div>
                                <div className="container-nome">{produto.nome}</div>
                                </div>
                                <div className="style-preco">R$ {produto.preco}</div>
                            </div>
                        )
                    })}
                    <div className="btn-control-scroll">
                        <div onClick={handleScrollUp}><img src={ArrowUp} alt='seta'/></div>
                        <div onClick={handleScrollDown}><img src={ArrowDown} alt='seta'/></div>
                    </div>
                </div>
                <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                <div className="container-total-compra">
                    <span>Total</span>
                    <span>R${totalPrice}</span>
                </div>
                <div className="btn-comprar-limpar">
                    <button onClick={() => setCurrentCart([])} className="btn-limpar-carrinho">Limpar Carrinho</button>
                    <button className="btn-finalizar-compra">Comprar</button>
                </div>
                </div>
            
            
            </div>
            )}
        </>
    )


}

export default ShowCart;