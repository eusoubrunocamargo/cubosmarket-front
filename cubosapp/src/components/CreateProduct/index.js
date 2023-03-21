import { useContext } from "react";
import { uploadImage } from '../../services/imageUploadService';
import { SuperModalContext } from "../../utils/modalContext";
import "./styles.css";
import { useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import { DndProvider , useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


function CreateProduct({carregarMeusProdutos, setMeusProdutos}) {

    const { setCurrentModal } = useContext(SuperModalContext);
    
    const handleCloseButtonClick = () => {
        setCurrentModal(null);
    };

    const [produto, setProduto] = useState({
        nome: '',
        descricao: '',
        preco: '',
        estoque: 0,
        imagem_url: '',
        categoria_id: '',
    });

    const [charsRemaining, setCharsRemaining] = useState(300);

    const handleForm = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if(name === 'descricao'){
            const maxLength = 300;
            const remainingChars = maxLength - value.length;
            setCharsRemaining(remainingChars);

        }
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
    const[selectedFiles, setSelectedFiles] = useState([]);

    const selectFile = (e) => {
        if(e.target.files.length > 0){
            const files = Array.from(e.target.files).slice(0, 4);
            files.forEach((file) => {
                renderPreviews(file);
            });
            setSelectedFiles((prev) => {
                const slots = 4 - prev.length;
                const filesToAdd = files.slice(0, slots);
                return [...prev, ...filesToAdd];
            });
        }
    };

    const uploadingImage = async () => {
       
        try {
            const imageURLS = await Promise.all(
                selectedFiles.map((file) => uploadImage(file))
            );
            const onlyURLS = imageURLS.map((response) => response.data.url );
            setSelectedFiles([]);
            return onlyURLS;
        } catch (error) {
            toast.error("Erro ao carregar imagens!");
            return [];
        }
    };

    const handleCreateAnuncio = async (e) => {
        e.preventDefault();
    
        if (!produto.nome || !produto.descricao || !produto.preco || !produto.estoque || !produto.categoria_id) {
            return toast.warning("Preencha os campos obrigatórios");
        }
    
        const imageUrls = await uploadingImage();

        //console.log(JSON.stringify(imageUrls));
        console.log(imageUrls);

        if (imageUrls.length === 0) {
            toast.error("Erro ao carregar imagens!");
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
                imagem_url: imageUrls,
            });
    
            setMeusProdutos(prevState => [...prevState, response.data.produto[0]]);
            carregarMeusProdutos();
            handleCloseButtonClick();
            toast.success("Produto cadastrado com sucesso!");
    
        } catch (error) {
            toast.error(error);
        }
    };

    const [previews, setPreviews] = useState([]);

    const renderPreviews = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviews((prev) => [...prev, reader.result]);
        };
    };

    function DraggableImage({ preview , index , moveImage }){

        const[{ isDragging } , drag] = useDrag(() => ({
            type: 'image',
            item: { index },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }));

        const [, drop] = useDrop(() => ({
            accept: 'image',
            hover(item, monitor) {
                if (item.index === index) {
                    return;
                }
                moveImage(item.index, index);
                item.index = index;
            },
        }));

        return (
            <div    
                ref={(node) => drag(drop(node))}
                className={index === 0 ? 'previewprincipal' : 'preview'}
                style={{opacity: isDragging ? 0.5 : 1}}>
                    <img src={preview} alt='preview'/>
                    {index === 0 && <span>principal</span>}
            </div>
        );
    };

    const moveImage = (fromIndex , toIndex) => {
       
        const newPreviews = [...previews];
        const [modedPreviews] = newPreviews.splice(fromIndex, 1);
        newPreviews.splice(toIndex, 0, modedPreviews);

        const newSelectedFiles = [...selectedFiles];
        const [movedFile] = newSelectedFiles.splice(fromIndex, 1);
        newSelectedFiles.splice(toIndex, 0, movedFile);

        setPreviews(newPreviews);
        setSelectedFiles(newSelectedFiles)

    };
    

    return (
        <>
                <form className="container-form-cadastro-produto" onSubmit={handleCreateAnuncio} encType="multipart/form-data">
                    <h1 className="titulo-form">Cadastrar novo produto</h1>

                    <div className="container-nome-produto">
                        <label htmlFor="nome">Nome</label>
                        <input type="text" id="nome" name="nome" value={produto.nome} onChange={handleForm} required />
                    </div>

                    <div className="container-descricao-produto">
                        <label htmlFor="descricao">Descrição</label>
                        <textarea id="descricao" name="descricao" value={produto.descricao} onChange={handleForm} required maxLength={300} />
                        <span className={charsRemaining >= 50 ? "counter-descricao" : "counter-descricao red"}>{charsRemaining}/300</span>
                    </div>

                    <div className="container-preco-estoque-categoria-produto">
                        <div className="container-form-preco-produto">
                            <label htmlFor="preco">Preço</label>
                            {/* <input type="number" id="preco" name="preco" value={produto.preco} onChange={handleForm} min="0" required /> */}
                             <input type='text' id='preco' name="preco" value={produto.preco} onChange={(e) => {
                                const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                                setProduto({
                                    ...produto,
                                    preco: onlyNums,
                                });
                             }} placeholder="R$" required/>
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
                            {selectedFiles.length < 4 ? "Escolha até 4 imagens" : "Imagens selecionadas"}
                            <input className="btn-choose-file" type="file" onChange={selectFile} multiple required disabled={selectedFiles.length >= 4}/>
                        </label>

                        <DndProvider backend={HTML5Backend}>

                        <div className="container-preview">
                            {previews.map((preview, index) => (      
                                <DraggableImage
                                key={index}      
                                preview={preview}
                                index={index}
                                moveImage={moveImage}
                                />))}
                        </div>    

                        </DndProvider>

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
        </>
    )


}

export default CreateProduct;