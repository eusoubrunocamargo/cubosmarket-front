import { useState , useContext} from "react";
import './styles.css';
import { SuperModalContext } from "../../utils/modalContext";
import User from '../../assets/user.svg'
import api from "../../services/api";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../utils/authContext";

const LoginForm = () => {

    const navigate = useNavigate();
    const { login} = useAuth();

    const { setCurrentModal } = useContext(SuperModalContext);
    
    const [isLoginForm, setIsLoginForm] = useState(null);

    const [formValues, setFormValues] = useState({
        nome: '',
        email: '',
        senha: '',
        checksenha: ''
    });

    const handleInputChange = (e) => {
        const {id,value} = e.target;
        setFormValues(prevLoginForm => ({...prevLoginForm, [id]: value}));
    };

    const handleCloseButtonClick = () => {
        setCurrentModal(null);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        const url = isLoginForm?'/login':'/cadastro';
        const payload = isLoginForm
        ? { email: formValues.email, senha: formValues.senha}
        : { nome: formValues.nome, email: formValues.email, senha: formValues.senha}; 
        console.log(`Enviando ${JSON.stringify(payload)} na rota ${url}`);
        
        if(isLoginForm){
            login(payload);
        } else {
            api.post('/cadastro', JSON.stringify(payload))
            .then((response) => {
                alert(response.data.mensagem);
            })
            .catch((error) => {
                console.log(error);
                alert(error.response.data.mensagem);
            });
        };
        
        navigate("/");
        handleCloseButtonClick();

    };

    const handleLoginClick = () => {
        setIsLoginForm(true);
    };

    const handleCadastroClick = () => {
        setIsLoginForm(false);
    };

    if(isLoginForm === null){
        return (
        <>
        <div className="container-login-cadastro">
            <button className="btn-fechar-modal" onClick={handleCloseButtonClick}>X</button>
            <img src={User} alt='usuário'/>
            <span>Já é usuário? </span>
            <span>Faça{' '}
            <button onClick={handleLoginClick}>login</button> ou{' '}
            <button onClick={handleCadastroClick}>cadastre-se</button>
            </span>
        </div> 
        </>)}

    return (
        <>
        <div className="container-login-cadastro">
            <button className="btn-fechar-modal" onClick={handleCloseButtonClick}>X</button>
            <img src={User} alt='usuário'/>
            <span>Já é usuário? </span>
            <span>Faça{' '}
            <button onClick={handleLoginClick}>login</button> ou{' '}
            <button onClick={handleCadastroClick}>cadastre-se</button>
            </span> 
        </div>
        <form className="container-form" onSubmit={handleSubmit}>
        {!isLoginForm && (
            <>
            <label htmlFor="nome">Nome</label>
            <input
                type="text"
                id="nome"
                value={formValues.nome}
                onChange={handleInputChange}
            />
            </>
        )}
            <label htmlFor="email">E-mail</label>
            <input
                type="email"
                id="email"
                value={formValues.email}
                onChange={handleInputChange}
            />
            <label htmlFor="senha">Senha</label>
            <input
                type="password"
                id="senha"
                value={formValues.senha}
                onChange={handleInputChange}
            />
            {!isLoginForm && (
            <>
                <label htmlFor="checksenha">Confirme a senha</label>
                 <input
                type="password"
                id="checksenha"
                value={formValues.checksenha}
                onChange={handleInputChange}
                />
            </>
            )}
            <div className="container-btn-entrar">
                <button className="btn-entrar">
                    {isLoginForm ? 'Entrar' : 'Cadastrar'}</button>
            </div>
        </form>
        </>
    );
};

export default LoginForm;