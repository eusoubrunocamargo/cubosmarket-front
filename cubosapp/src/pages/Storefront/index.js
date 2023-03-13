import './styles.css';
import api from '../../services/api';
import { useState, useEffect } from "react";
import Card from '../../components/Card';

function StoreFront () {

    const[produtos,setProdutos] = useState([])

    useEffect(() => {
        async function loadProdutos() {
            try {
                const response = await api.get('/');
                setProdutos(response.data);
            } catch (error) {
                console.log(error);
            };
        };
        loadProdutos();
    },[]);

    return (
        <>
        <div className='container-geral-storefront'>
            {produtos && produtos.map((produto) => (
                <Card key={produto.id} produto={produto}/>
            ))}
        </div>
        </>
    );
};

export default StoreFront;


  // useEffect(() => {
    //     async function loadProdutos() {
    //         try {
    //             const response = await api.get('/');
    //             setProdutos(response.data);
    //         } catch (error) {
    //             console.log(error);
    //         };
    //     };
    //     loadProdutos();
    // },[]);