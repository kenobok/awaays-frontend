import { AuthProvider } from "./AuthContext";
import { SearchProvider } from "./SearchContext";

const ContextProvider = ({ children }) => {
    return (
        <AuthProvider>
            <SearchProvider>{children}</SearchProvider>
        </AuthProvider>
    );
};

export default ContextProvider;
