import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FAQs from "./pages/Faqs";
import NotFound from "./pages/NotFound";


const checkAuth = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) throw redirect("/login");
};

const router = createBrowserRouter([
    { 
        path: "/", element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "about-us", element: <AboutUs /> },
            { path: "contact-us", element: <ContactUs /> },
            { path: "terms-and-conditions", element: <TermsConditions /> },
            { path: "privacy-policy", element: <PrivacyPolicy /> },
            { path: "fAQs", element: <FAQs /> },
            { path: "join", element: <AuthPage /> },
            // { path: "logout", element: <Logout />, loader: checkAuth, },
        ]
    },
    { path: "*", element: <NotFound /> }
]);

export default router

