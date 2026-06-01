import {
    Routes,
    Route
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";

import HomePage from "./pages/HomePage";

import PremiumPage from "./pages/PremiumPage";

import ProfilePage from "./pages/ProfilePage";

import ProtectedRoute from "./components/ProtectedRoute";

import Navbar from "./components/Navbar";

import PracticePage from "./pages/PracticePage";

import InterviewRoom from "./pages/InterviewRoom";

import { useAuth } from "./context/AuthContext";

function App() {

    const { loading } = useAuth();

    // 🔥 prevent UI flicker on refresh
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

    return (

        <>

            <Navbar />

            <Routes>

                {/* PUBLIC ROUTE */}
                <Route
                    path="/"
                    element={<LoginPage />}
                />

                {/* PROTECTED ROUTES */}
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/practice"
                    element={
                        <ProtectedRoute>
                            <PracticePage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/premium"
                    element={
                        <ProtectedRoute>
                            <PremiumPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/interview-room"
                    element={
                        <ProtectedRoute>
                            <InterviewRoom />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </>

    );
}

export default App;