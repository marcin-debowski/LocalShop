import { Routes, Route, BrowserRouter  } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Layout from "../components/layout/LayoutAll";
import NoPage from "../pages/NoPage";
import Shop from "../pages/Shop";
import AddProduct from "../pages/AddProduct";
import ShoppingCart from "../pages/ShoppingCart";
import AccountChoose from "../pages/AccountChoose";
import Summary from "../pages/Summary";
import Profile from "../pages/Profile";
import OrdersProfile from "../pages/profilePages/OrdersProfile";
import SettingsProfile from "../pages/profilePages/SetingsProfile";

function AppRouter() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="login" element={<Login path="/" />} />
                        <Route path="register" element={<Register />} />
                        <Route path="shop" element={<Shop />} />
                        <Route path="add-product" element={<AddProduct />} />
                        <Route path="shopping-cart" element={<ShoppingCart />} />
                        <Route path="choose-account" element={<AccountChoose />} />
                        <Route path="summary" element={<Summary />} />
                        <Route path="profile" element={<Profile />} >
                            <Route index element={<SettingsProfile />} />
                            <Route path="orders" element={<OrdersProfile />} />
                        </Route>
                        <Route path="*" element={<NoPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}
export default AppRouter;