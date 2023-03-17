import { useContext } from 'react';
import { SuperModalContext } from '../../utils/modalContext';
import './styles.css'

const SuperModal = () => {

    const {currentModal , setCurrentModal } = useContext(SuperModalContext);

    const handleClick = (e) => {
        e.stopPropagation();
    };

    return (    
        <>
        {currentModal &&
        <div onClick={() => {setCurrentModal(null)}} className='container-background-transition'>
            <div onClick={handleClick} className='container-super-modal'>
                {currentModal}
            </div>
        </div>}
        </>
    );
};

export default SuperModal;

