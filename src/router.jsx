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
import ViewItemRequests from "./pages/account/ViewItemRequests";
import MyGiveaways from "./pages/account/MyGiveaways";
import ReceivedItems from "./pages/account/ReceivedItems";
import ForumGroups from "./pages/account/ForumGroups";
import GiveItem from "./pages/giveaway/GiveItem";
import GiveawayItems from './pages/giveaway/GiveawayItems';
import GiveawayItemDetails from './pages/giveaway/GiveawayItemDetails';
import Leaderboard from "./pages/community/leaderboard/Leaderboard";
import LeaderboardDetails from "./pages/community/leaderboard/LeaderboardDetails";
import Forums from "./pages/community/forums/Forums";
import ForumsList from "./pages/community/forums/ForumsList";
import ForumDetails from "./pages/community/forums/ForumDetails";
import Groups from "./pages/community/groups/Groups";
import GroupsList from "./pages/community/groups/GroupsList";
import GroupDetails from "./pages/community/groups/GroupDetails";
import Gallery from "./pages/community/gallery/Gallery";
import GalleryList from "./pages/community/gallery/GalleryList";
import GalleryImages from "./pages/community/gallery/GalleryImages";
import Events from "./pages/community/Events";
import HowItWorks from "./pages/HowItWorks";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FAQs from "./pages/FAQs";
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
            { path: 'giveaway-item-details/:itemId', element: <GiveawayItemDetails /> },
            { path: "how-it-works", element: <HowItWorks /> },
            { path: "about-us", element: <AboutUs /> },
            { path: "contact-us", element: <ContactUs /> },
            { path: "terms-and-conditions", element: <TermsConditions /> },
            { path: "privacy-policy", element: <PrivacyPolicy /> },
            { path: "fAQs", element: <FAQs /> },
            // { path: "logout", element: <Logout />, loader: checkAuth, },

            // Dashboard Link
            {
                path: "/dashboard", element: <DashboardLayout />,
                children: [
                    { index: true, element: <Dashboard /> },
                    { path: "profile", element: <Profile /> },
                    {
                        path: "messages", element: <Messages />,
                        children: [
                            { path: ":messageSlug", element: <MessageDetails /> }
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
                    { path: "forums-and-groups", element: <ForumGroups /> },
                ]
            },

            // Leaderboard Link
            { 
                path: 'community/leaderboard', element: <Leaderboard />,
                children: [
                    { index: true, element: <LeaderboardDetails /> },
                    { path: '/community/leaderboard/last-week', element: <LeaderboardDetails /> },
                    { path: '/community/leaderboard/all-time', element: <LeaderboardDetails /> },
                ]
            },

            // Forums Link
            {
                path: '/community/forums', element: <Forums />,
                children: [
                    { index: true, element: <ForumsList /> },
                    { path: ':forumLink', element: <ForumDetails /> },
                ]
            },

            // Groups Link
            {
                path: '/community/groups', element: <Groups />,
                children: [
                    { index: true, element: <GroupsList /> },
                    { path: ':slug', element: <GroupDetails /> },
                ]
            },

            // Gallery Link
            {
                path: 'community/gallery', element: <Gallery />,
                children: [
                    { index: true, element: <GalleryList /> },
                    { path: ':slug', element: <GalleryImages /> }
                ]
            },

            // Events Link
            { path: 'community/events', element: <Events /> },
        ]
    },
    { path: "*", element: <NotFound /> }
]);

export default router

