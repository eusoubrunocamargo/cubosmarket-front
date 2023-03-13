import "../Card/styles.css";

function Card({produto}) {
    return (
        <div className="container-geral-card">
            <div className="container-foto-produto">
                <img className="image-sizing" src={produto.imagem_url} alt="produto" />
            </div>

            <div className="container-nome-produto">
                <span>{produto.nome}</span>
            </div>

            <div className="container-preco-produto">
                <h1>R$ {produto.preco}</h1>
            </div>
        </div>
    );
};

export default Card;