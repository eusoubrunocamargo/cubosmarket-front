import './styles.css';

//functions
import { useContext } from 'react';
import { SuperModalContext } from '../../utils/modalContext';
import { useAuth } from '../../auth';

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


function Menu () {

    const { isAuthenticated}  = useAuth();
    const {setCurrentModal} = useContext(SuperModalContext);

    const handleCartModal = () => {
        setCurrentModal(<ShowCart/>);
    };

    const handleUserModal = () => {
        !isAuthenticated? setCurrentModal(<LoginForm/>):setCurrentModal(<LoginForm/>);
    };

    return (

        <header className='container-geral-menu'>
            <div className='container-logomarca'>
                <img src={Logomarca} alt='logomarca' className='menu-logomarca'/>
            </div>
            <nav className='container-menu-nav'>
                <div>
                    <button onClick={handleCartModal}>
                        <img src={Carrinho} alt='carrinho'/>
                        <span>Meu Carrinho</span>
                    </button>
                </div>
                <div>
                    <button>
                        <img src={Mercado} alt='mercado'/>
                        <span>Meu Mercado</span>
                    </button>
                </div>
                <div>
                    <button onClick={handleUserModal}>
                        <img src={User} alt='usuário'/>
                        <span>Usuário</span>
                    </button>
                </div>
                <div>
                    <button>
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