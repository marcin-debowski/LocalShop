import {Outlet} from "react-router-dom";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import { useAuthStore } from "../../zustand/authStore";
import { useEffect } from "react";

function Layout() {
    const fetchUser = useAuthStore((state) => state.fetchUser);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
export default Layout;
