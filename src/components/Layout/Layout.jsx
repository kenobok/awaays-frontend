import { Outlet } from "react-router-dom";
import ScrollToTop from "../utils/ScrollToTop";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {

    return (
        <>
            <Header />
            <ScrollToTop />
            <Outlet />
            <Footer />
        </>
    );
}

export default Layout;