import './styles.css';
import Logomarca from '../../assets/logomarca.svg';
import Carrinho from '../../assets/carrinho.svg';
import User from '../../assets/user.svg';
import Vender from '../../assets/vender.svg';
import Mercado from '../../assets/mercado.svg';

function Menu () {

    return (

        <header className='container-geral-menu'>
            <div className='container-logomarca'>
                <img src={Logomarca} alt='logomarca' className='menu-logomarca'/>
            </div>
            <nav className='container-menu-nav'>
                <div>
                    <button>
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
                    <button>
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
        </header>
    );
};

export default Menu;