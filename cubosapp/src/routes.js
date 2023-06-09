import { Routes, Route, Navigate} from "react-router-dom";
import Menu from "./components/Menu";
import StoreFront from "./pages/Storefront/index";
import MyStore from "./pages/MyStore";
import SellerShop from "./pages/SellerShop";
import PrivateRoute from "./components/PrivateRoute";
import { SuperModalProvider } from "./utils/modalContext";
import { AuthProvider } from './utils/authContext';
import { MyCartProvider } from './utils/cartContext';

const MyRoutes = () => {
    return (
        <>
        <AuthProvider>
            <SuperModalProvider>
                <MyCartProvider>
                    <Menu/>
                    <Routes>
                        <Route path="/" element={<StoreFront/>}/>
                        <Route path="/mystore" element={<PrivateRoute><MyStore/></PrivateRoute>}/>
                        <Route path="/:sellername" element={<SellerShop/>}/>
                        <Route path="*" element={<Navigate to='/'/>}/>
                    </Routes>
                </MyCartProvider>
            </SuperModalProvider>
        </AuthProvider>
        </>
    );
};

export default MyRoutes;
