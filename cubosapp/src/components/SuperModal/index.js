import { useContext } from 'react';
import { SuperModalContext } from '../../utils/modalContext';
import './styles.css'

const SuperModal = () => {

    const {currentModal } = useContext(SuperModalContext);

    return (    
        <>
        {currentModal &&
        <div className='container-background-transition'>
            <div className='container-super-modal'>
                {currentModal}
            </div>
        </div>}
        </>
    );
};

export default SuperModal;

