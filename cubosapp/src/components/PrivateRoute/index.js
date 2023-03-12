import { Route, Navigate} from 'react-router-dom';
import { useAuth } from '../../auth';


function PrivateRoute({path,element}){

    const { isAuthenticated}  = useAuth();

    return isAuthenticated ? (
        <Route path={path} element={element}/>
    ) : (
        <Navigate to='/' replace/>
    );
};

export default PrivateRoute;