import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import AuthPage from "./pages/account/AuthPage";
import GiveItem from "./pages/giveaway/GiveItem";
import GiveawayItems from './pages/giveaway/GiveawayItems';
import HowItWorks from "./pages/HowItWorks";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FAQs from "./pages/Faqs";
import NotFound from "./pages/NotFound";


const checkAuth = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) throw redirect("/auth");
};

const router = createBrowserRouter([
    { 
        path: "/", element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "auth", element: <AuthPage /> },
            { path: 'give-item', element: <GiveItem />, /*loader: checkAuth*/ },
            { path: 'giveaway-items', element: <GiveawayItems /> },
            { path: "how-it-works", element: <HowItWorks /> },
            { path: "about-us", element: <AboutUs /> },
            { path: "contact-us", element: <ContactUs /> },
            { path: "terms-and-conditions", element: <TermsConditions /> },
            { path: "privacy-policy", element: <PrivacyPolicy /> },
            { path: "fAQs", element: <FAQs /> },
            // { path: "logout", element: <Logout />, loader: checkAuth, },
        ]
    },
    { path: "*", element: <NotFound /> }
]);

export default router

