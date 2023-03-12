import { Routes, Route, Navigate} from "react-router-dom";
import Menu from "./components/Menu";
import StoreFront from "./pages/Storefront/index";
import MyStore from "./pages/MyStore";
import SellerShop from "./pages/SellerShop";
import PrivateRoute from "./components/PrivateRoute";
import { SuperModalProvider } from "./utils/modalContext";

const MyRoutes = () => {
    return (
        <>
        <SuperModalProvider>
        <Menu/>
        </SuperModalProvider>
        <Routes>
            <Route path="/" element={<StoreFront/>}/>
            <Route path="/mystore" element={<PrivateRoute path={'/mystore'} element={<MyStore/>} />}/>
            <Route path="/:sellername" element={<SellerShop/>}/>
            <Route path="*" element={<Navigate to='/'/>}/>
        </Routes>
        </>
    );
};

export default MyRoutes;
