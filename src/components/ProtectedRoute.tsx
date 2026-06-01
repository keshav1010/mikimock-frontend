import { useAuth } from "../context/AuthContext";

import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {

    const { user, loading } = useAuth();

    const location = useLocation();

    // 🔥 show loader instead of blank screen
    if (loading) {

        return (
            <div className="
                min-h-screen
                flex
                items-center
                justify-center
                bg-black
                text-white
            ">
                Loading...
            </div>
        );
    }

    // 🔐 not logged in → redirect to login
    if (!user) {

        return (
            <Navigate
                to="/"
                replace
                state={{ from: location }}
            />
        );
    }

    return children;
};

export default ProtectedRoute;