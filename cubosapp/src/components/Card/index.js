import "../Card/styles.css";
import { SuperModalContext } from "../../utils/modalContext";
import { useContext } from "react";
import ProductDetail from '../ProductDetail';

function Card({produto}) {

    const { setCurrentModal } = useContext(SuperModalContext);

    return (
        <div onClick={() => setCurrentModal(<ProductDetail produto={produto}/>)} className="container-geral-card">
            <div className="container-foto-produto">
                <img className="image-sizing" src={produto.imagem_url} alt="produto" />
            </div>

            <div className="container-nome-preco">
                <div className="container-nome-produto">
                    <span>{produto.nome}</span>
                </div>

                <div className="container-preco-produto">
                    <h1>R$ {produto.preco}</h1>
                </div>
            </div>
        </div>
    );
};

export default Card;