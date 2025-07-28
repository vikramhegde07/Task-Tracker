import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import type { User, AuthContextType } from "@/types/User";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProp = {
    children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProp) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("userToken")
    );

    const login = ({ newToken, userData, }: { newToken: string; userData: User; }) => {
        localStorage.setItem("userToken", newToken);
        localStorage.setItem("userData", JSON.stringify(userData));

        setToken(newToken);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userData");
        setToken(null);
        setUser(null);
    };

    useEffect(() => {
        const savedToken = localStorage.getItem("userToken");
        const savedUser = localStorage.getItem("userData");

        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, logout, login }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
