import { useState , useContext} from "react";
import './styles.css';
import { SuperModalContext } from "../../utils/modalContext";
import User from '../../assets/user.svg'

const LoginForm = () => {

    const { setCurrentModal } = useContext(SuperModalContext);
    
    const [isLoginForm, setIsLoginForm] = useState(null);

    const [formValues, setFormValues] = useState({
        nome: '',
        email: '',
        password: '',
        checkpassword: ''
    });

    const handleInputChange = (e) => {
        const {id,value} = e.target;
        setFormValues(prevLoginForm => ({...prevLoginForm, [id]: value}));
    };

    const handleCloseButtonClick = () => {
        setCurrentModal(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const route = isLoginForm?'/login':'/cadastro';
        const payload = isLoginForm
        ? { email: formValues.email, password: formValues.password}
        : { nome: formValues.nome, email: formValues.email, password: formValues.password, checkpassword: formValues.checkpassword}; 
        console.log(`Enviando ${JSON.stringify(payload)} na rota ${route}`);
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
            <label htmlFor="password">Senha</label>
            <input
                type="password"
                id="password"
                value={formValues.password}
                onChange={handleInputChange}
            />
            {!isLoginForm && (
            <>
                <label htmlFor="checkpassword">Senha</label>
                 <input
                type="password"
                id="checkpassword"
                value={formValues.checkpassword}
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