import './styles.css';
import { useNavigate } from 'react-router-dom';
import { SuperModalContext } from '../../utils/modalContext';
import Mercado from '../../assets/mercado.svg'
import { useContext , useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';


const CreateStore = () => {
    
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [nomeLoja, setNomeLoja] = useState("");
    const { setCurrentModal } = useContext(SuperModalContext);
    const handleCloseButtonClick = () => {
        setCurrentModal(null);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!nomeLoja) {
            return toast.warn("O nome da loja é obrigatório!");
        };

        const userID = localStorage.getItem("id");

        try {

            const response = await api.post("/loja", {
                nome: nomeLoja,
                usuario_id: userID,
            });

            //console.log(response.data);

            const { marketname } = response.data;
            localStorage.setItem("loja_cadastrada", true);
            localStorage.setItem("marketname", marketname);

            toast.success("Loja criada!");

            navigate("/mystore");

            handleCloseButtonClick();

        } catch (error) {
            toast.error(error);
        };
    };

return (

        <>
            <div className="container-login-cadastro-loja">
                <button className="btn-fechar-modal" onClick={handleCloseButtonClick}>X</button>
                <img src={Mercado} alt='usuário'/>
                {!showForm ?
                (
                <>
                    <h1 style={{color: 'GrayText'}}>Ops!</h1>
                    <div style={{display: 'flex' , flexDirection: 'column', alignItems: 'center'}}>
                    <span>Parece que você não criou uma loja ainda...</span>
                    <span>Deseja criar uma agora?</span>
                    </div>
                    <button onClick={() => setShowForm(true)} style={{
                        color: 'white' , 
                        fontWeight: 'bold',
                        backgroundColor: '#B7005C',
                        width: '18rem',
                        height: '3rem',
                        borderRadius: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                        }}>Sim, quero vender!</button>
                </>
                ) : (
                <>
                    <h1 style={{color: 'GrayText'}}>Vamos lá!</h1>
                    <span>Qual o nome da sua loja?</span>                
                    <div className="container-login-cadastro-loja">
                        <form className="form-container-cadastro-loja" onSubmit={handleFormSubmit}>
                            <label htmlFor="nome-loja"/>
                            <input
                            type="text"
                            id="nome-loja"
                            placeholder="Loja da Maria..."
                            value={nomeLoja}
                            onChange={(event) => setNomeLoja(event.target.value)}
                            />
                            <button className="btn-open-market" type="submit">Abrir minha loja</button>
                            {/* <button className="btn-cancel-open-market" onClick={() => { setShowMarketModal(false) }}>Cancelar</button> */}
                        </form>
                    </div>
                </>

                )}
            </div> 
        </>

)};

export default CreateStore;