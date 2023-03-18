import './styles.css';

//functions
import { useContext } from 'react';
import { useNavigate  } from 'react-router-dom';
import { SuperModalContext } from '../../utils/modalContext';
import { MyCartContext } from '../../utils/cartContext';
import { useAuth } from '../../utils/authContext';

//assets
import Logomarca from '../../assets/logomarca.svg';
import Carrinho from '../../assets/carrinho.svg';
import User from '../../assets/user.svg';
import Vender from '../../assets/vender.svg';
import Mercado from '../../assets/mercado.svg';

//components
import SuperModal from '../SuperModal';
import ShowCart from '../ShowCart';
import LoginForm from '../Login';
import CreateStore from '../CreateStore';
import SetUser from '../User';

function Menu () {

    const { isAuthenticated } = useAuth();
    console.log(`passou pelo menu e isauth? ${isAuthenticated}`);
    const {setCurrentModal} = useContext(SuperModalContext);
    const {currentCart} = useContext(MyCartContext);

    const navigate = useNavigate();

    const handleCartModal = () => {
        setCurrentModal(<ShowCart/>);
    };

    const handleUserModal = () => {
        isAuthenticated? setCurrentModal(<SetUser/>):setCurrentModal(<LoginForm/>);
    };
    
    const handleMarketModal = () => {
        
        if(isAuthenticated){
            const hasStore = localStorage.getItem('loja_cadastrada');
            hasStore === 'true' ? navigate("/mystore") : setCurrentModal(<CreateStore/>)
            return;
        };
        
        setCurrentModal(<LoginForm/>);
        
    };

    const handleSellModal = () => {
        if(isAuthenticated){
            const hasStore = localStorage.getItem('loja_cadastrada');
            hasStore === 'true' ? navigate("/mystore") : setCurrentModal(<CreateStore/>)
            return;
        };
        setCurrentModal(<LoginForm/>);
    };

    return (

        <header className='container-geral-menu'>
            <div onClick={() => navigate('/')} className='container-logomarca'>
                <img src={Logomarca} alt='logomarca' className='menu-logomarca'/>
            </div>
            <nav className='container-menu-nav'>
                <div>
                    <button onClick={handleCartModal}>
                        <img src={Carrinho} alt='carrinho'/>
                        <span>{currentCart.length === 0? "Meu Carrinho" : currentCart.length}</span>
                    </button>
                </div>
                <div>
                    <button onClick={handleMarketModal}>
                        <img src={Mercado} alt='mercado'/>
                        <span>Meu Mercado</span>
                    </button>
                </div>
                <div>
                    <button onClick={handleUserModal}>
                        <img src={User} alt='usuário'/>
                        <span>{isAuthenticated? localStorage.getItem("nome") : "Usuário"}</span>
                    </button>
                </div>
                <div>
                    <button onClick={handleSellModal}>
                        <img src={Vender} alt='vender'/>
                        <span>Vender</span>
                    </button>
                </div>
            </nav>
            <SuperModal/>
        </header>
    );
};

export default Menu;