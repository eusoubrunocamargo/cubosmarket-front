// import { Route, Navigate, Routes} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../utils/authContext';

function PrivateRoute({children}){

    //const { path , element } = props;

    //console.log(path,element);

    const { isAuthenticated }  = useAuth();

    console.log("entrou no private");

    if (isAuthenticated)
    {
        console.log(`private is ${isAuthenticated}`);
        //return <Routes><Route path={path} element={element}/></Routes>
        return children;    
    };

    return <Navigate to='/' replace/>

};

export default PrivateRoute;