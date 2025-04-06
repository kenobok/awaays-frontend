import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import AuthPage from "./pages/account/AuthPage";
import DashboardLayout from "./pages/account/DashboardLayout";
import Dashboard from "./pages/account/Dashboard";
import Profile from "./pages/account/Profile";
import Messages from "./pages/account/Messages";
import MessageDetails from "./pages/account/MessageDetails";
import MyRequests from "./pages/account/MyRequests";
import ItemRequests from "./pages/account/ItemRequests";
import ViewItemRequests from "./pages/account/viewItemRequests";
import MyGiveaways from "./pages/account/MyGiveaways";
import ReceivedItems from "./pages/account/ReceivedItems";
import ForumGroups from "./pages/account/ForumGroups";
import GiveItem from "./pages/giveaway/GiveItem";
import GiveawayItems from './pages/giveaway/GiveawayItems';
import Leaderboard from "./pages/community/Leaderboard";
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
            { path: 'community/leaderboard', element: <Leaderboard /> },
            { path: "how-it-works", element: <HowItWorks /> },
            { path: "about-us", element: <AboutUs /> },
            { path: "contact-us", element: <ContactUs /> },
            { path: "terms-and-conditions", element: <TermsConditions /> },
            { path: "privacy-policy", element: <PrivacyPolicy /> },
            { path: "fAQs", element: <FAQs /> },
            // { path: "logout", element: <Logout />, loader: checkAuth, },

            { 
                path: "/dashboard", element: <DashboardLayout />,
                children: [
                    { index: true, element: <Dashboard /> },
                    { path: "profile", element: <Profile /> },
                    { 
                        path: "messages", element: <Messages />,
                        children: [
                            { path: ":messageId", element: <MessageDetails />}
                        ]
                    },
                    { path: "my-requests", element: <MyRequests /> },
                    { 
                        path: "item-requests", element: <ItemRequests />,
                        children: [
                            { path: ":itemName/:itemId", element: <ViewItemRequests /> }
                        ]
                    },
                    { path: "my-giveaways", element: <MyGiveaways /> },
                    { path: "received-items", element: <ReceivedItems /> },
                    { path: "forum-and-groups", element: <ForumGroups /> },
                ]
            }
        ]
    },
    { path: "*", element: <NotFound /> }
]);

export default router

