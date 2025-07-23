import { Routes, Route, BrowserRouter  } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Layout from "../components/layout/LayoutAll";
import NoPage from "../pages/NoPage";
import Shop from "../pages/Shop";
import AddProduct from "../pages/AddProduct";

function AppRouter() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="shop" element={<Shop />} />
                        <Route path="add-product" element={<AddProduct />} />
                        <Route path="*" element={<NoPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}
export default AppRouter;