import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import { getMe } from "../services/authService";

import { useNavigate } from "react-router-dom";

/* ---------- USER TYPE ---------- */

type User = {
    id: number;

    email: string;

    role: string;

    subscriptionType: string;

    freeInterviewUsed: number;

    publicId: string;

    fullName: string | null;
};

/* ---------- AUTH CONTEXT TYPE ---------- */

type AuthType = {

    user: User | null;

    loading: boolean;

    logout: () => void;

    setUser: React.Dispatch<
        React.SetStateAction<User | null>
    >;
};

/* ---------- CONTEXT ---------- */

const AuthContext =
    createContext<AuthType | null>(null);

/* ---------- PROVIDER ---------- */

export const AuthProvider = ({
    children
}: any) => {

    const navigate = useNavigate();

    const [user, setUser] =
        useState<User | null>(null);

    const [loading, setLoading] =
        useState(true);

    /* ---------- LOGOUT ---------- */

    const logout = () => {

        localStorage.removeItem(
            "accessToken"
        );

        setUser(null);

        navigate("/", {
            replace: true
        });
    };

    /* ---------- LOAD USER ---------- */

    useEffect(() => {

        const token =
            localStorage.getItem(
                "accessToken"
            );

        if (!token) {

            setLoading(false);

            return;
        }

        const loadUser = async () => {

            try {

                const res =
                    await getMe();

                setUser(
                    res.data.data
                );

            } catch (err) {

                logout();

            } finally {

                setLoading(false);
            }
        };

        loadUser();

    }, []);

    return (

        <AuthContext.Provider
            value={{
                user,
                loading,
                logout,
                setUser
            }}
        >

            {children}

        </AuthContext.Provider>
    );
};

/* ---------- HOOK ---------- */

export const useAuth = () => {

    const context =
        useContext(AuthContext);

    if (!context) {

        throw new Error(
            "use Auth must be used inside AuthProvider"
        );
    }

    return context;
};