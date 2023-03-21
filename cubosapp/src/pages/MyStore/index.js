import './styles.css';

//functions
import { SuperModalContext } from '../../utils/modalContext';
import { useContext, useEffect , useState } from 'react';
import api from '../../services/api';

//assets
import MercadoWhite from '../../assets/mercado_white.svg';
import Edit from '../../assets/btn_edit_product.svg';
import Del from '../../assets/btn_del_product.svg';
import EmptyMarket from '../../assets/empty_market.svg';

//components
import CreateProduct from '../../components/CreateProduct';

function MyStore () {

    const marketName = localStorage.getItem("nome_loja");
    const { setCurrentModal } = useContext(SuperModalContext);

    const [hasProduct, setHasProduct] = useState(true);
    const [meusProdutos, setMeusProdutos] = useState([]);

    useEffect(() => {
        carregarMeusProdutos();
    }, []);

    //carregar produtos do backend
    async function carregarMeusProdutos() {
        try {
            const response = await api.get("/produtos");
            console.log(response);
            setMeusProdutos(response.data);
            setHasProduct(response.data.length > 0);
        } catch (error) {
            console.log(error);
        };
    };

    //deletar produto
    const handleDeletarProduto = async (produtoId) => {
        try {
            await api.delete(`/produtos/${produtoId}`);
            const novosProdutos = meusProdutos.filter((produto) => produto.id !== produtoId);
            setMeusProdutos(novosProdutos);

            if(novosProdutos.length === 0){
                setHasProduct(false);
            }

            alert('produto deletado!');

        } catch (error) {
            console.log(error);
        }
    }



    return (
        <>
        <div className='container-geral-mystore'>

            <div className="container-mymarket-nav">
                <div className="mymarket-nav-logo">
                    <img src={MercadoWhite} alt="mercado" />
                    <h3>{marketName? marketName:"Minha Loja"}</h3>
                </div>
                <div className="container-btn-create-ad">
                <button onClick={()=>setCurrentModal(<CreateProduct setMeusProdutos={setMeusProdutos} carregarMeusProdutos={carregarMeusProdutos}/>)} className="btn-create-ad">+ Criar Anúncio</button>
                </div>
            </div>

            <div className="container-geral-produtos">
                {!hasProduct ?
                    <img className="img-empty-market" src={EmptyMarket} alt="Loja Vazia" />
                    :

                    <div className="container-tab-produtos">

                        <div className="index-tab-produtos">
                            <span className="index-nome-col-2-4">Nome</span>
                            <span className="index-nome-col-6">Estoque</span>
                            <span className="index-nome-col-8">Vendidos</span>
                            <span className="index-nome-col-10">Valor</span>
                        </div>

                        {meusProdutos.map((item) => (

                        <div className="container-modelo-produto" key={item.id}>

                            <div className="container-foto-produto-modelo">
                                <img src={item.urls[0]} alt="foto" />
                            </div>

                            <div className="container-nome-produto-modelo">
                                <span>{item.nome}</span>
                            </div>

                            <div className="container-estoque-produto-modelo">
                                <span>{item.estoque}</span>
                            </div>

                            <div className="container-vendidos-produto-modelo">
                                <span>100</span>
                            </div>

                            <div className="container-preco-produto-modelo">
                                <span>R${item.preco}</span>
                            </div>

                            <div className="container-edit-produto-modelo">
                                <button><img src={Edit} alt="editar"/></button>
                                <button onClick={() => handleDeletarProduto(item.id)}><img src={Del} alt="deletar"/></button>
                            </div>

                        </div>
                        ))}

                    </div>
                }
            </div>
        </div>
        </>
    );
};

export default MyStore;