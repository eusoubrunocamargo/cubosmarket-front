import { useContext } from "react";
import { uploadImage } from '../../services/imageUploadService';
import { SuperModalContext } from "../../utils/modalContext";
import "./styles.css";
import { useState } from "react";
import api from "../../services/api";

function CreateProduct({carregarMeusProdutos, setMeusProdutos}) {

    const { setCurrentModal } = useContext(SuperModalContext);
    
    const handleCloseButtonClick = () => {
        setCurrentModal(null);
    };

    const [produto, setProduto] = useState({
        nome: '',
        descricao: '',
        preco: 0,
        estoque: 0,
        imagem_url: '',
        categoria_id: '',
    });

    const handleForm = (e) => {
        setProduto({
            ...produto,
            [e.target.name] : e.target.value,
        });
    };

    const categories = [
        { value: 'alimentacao', label: 'Alimentação' },
        { value: 'vestuario', label: 'Vestuário' },
        { value: 'tecnologia', label: 'Tecnologia' },
        { value: 'veiculos', label: 'Veículos' },
    ];

    //manipulação de imagem
    const[selectedFile, setSelectedFile] = useState(null);

    const selectFile = (e) => {
        console.log(e.target.files.length);
        console.log(e.target.files);
        if(e.target.files.length > 0){
            setSelectedFile(e.target.files[0]);
        }
    };

    const uploadingImage = async () => {
        try {
            const response = await uploadImage(selectedFile);
            setSelectedFile(null);
            console.log(response.data);
            return response.data.url;
        } catch (error) {
            console.log("entrou no erro");
            console.log(error);
            return "";
        }
    };

    const handleCreateAnuncio = async (e) => {
        e.preventDefault();
    
        if (!produto.nome || !produto.descricao || !produto.preco || !produto.estoque || !produto.categoria_id) {
            return alert("Campos obrigatórios");
        }
    
        const imageUrl = await uploadingImage();

        console.log(imageUrl);


    
        if (imageUrl === "") {
            alert("Erro ao carregar imagem!");
            return;
        }
    
        try {
            const categoriaIds = {
                alimentacao: 1,
                vestuario: 2,
                tecnologia: 3,
                veiculos: 4,
            };
    
            const response = await api.post('/produtos', {
                nome: produto.nome,
                descricao: produto.descricao,
                preco: Number(produto.preco),
                estoque: Number(produto.estoque),
                categoria_id: categoriaIds[produto.categoria_id],
                user_id: Number(localStorage.getItem("id")),
                imagem_url: imageUrl,
            });
    
            setMeusProdutos(prevState => [...prevState, response.data.produto[0]]);
            carregarMeusProdutos();
            handleCloseButtonClick();
    
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <>
            {/* <div className="container-carrinho-vazio"> */}
                <form className="container-form-cadastro-produto" onSubmit={handleCreateAnuncio} encType="multipart/form-data">
                    <h1 className="titulo-form">Cadastrar novo produto</h1>

                    <div className="container-nome-produto">
                        <label htmlFor="nome">Nome</label>
                        <input type="text" id="nome" name="nome" value={produto.nome} onChange={handleForm} required />
                    </div>

                    <div className="container-descricao-produto">
                        <label htmlFor="descricao">Descrição</label>
                        <textarea id="descricao" name="descricao" value={produto.descricao} onChange={handleForm} required />
                    </div>

                    <div className="container-preco-estoque-categoria-produto">
                        <div className="container-form-preco-produto">
                            <label htmlFor="preco">Preço</label>
                            <input type="number" id="preco" name="preco" value={produto.preco} onChange={handleForm} min="0" required />
                        </div>

                        <div className="container-form-estoque-produto">
                            <label htmlFor="estoque">Estoque</label>
                            <input type="number" id="estoque" name="estoque" value={produto.estoque} onChange={handleForm} min="0" required />
                        </div>

                        <div className="container-form-categoria">
                            <label htmlFor="categoria_id">Categoria</label>
                            <select id="categoria_id" name="categoria_id" value={produto.categoria_id} onChange={handleForm} required>
                                <option value="">Escolha uma categoria</option>
                                {categories.map((category) => (
                                    <option key={category.value} value={category.value}>{category.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="container-upload-imagem">
                        <label className="btn btn-default">
                            <input className="btn-choose-file" type="file" onChange={selectFile} required />
                        </label>
                    </div>

                    <div className="container-btn-publicar-cancelar">
                        <div className="container-btn">
                            <button type="submit" className="btn-publicar">Publicar</button>
                        </div>
                        <div className="container-btn">
                            <button onClick={handleCloseButtonClick} className="btn-cancelar">Cancelar</button>
                        </div>
                    </div>
                </form>
            {/* </div> */}
        </>
    )


}

export default CreateProduct;