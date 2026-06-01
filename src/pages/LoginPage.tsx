import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";

import { useAuth } from "../context/AuthContext";

const LoginPage = () => {

    const navigate = useNavigate();

    const { setUser } = useAuth();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const handleLogin = async () => {

        /* ---------- VALIDATION ---------- */

        if (
            !email.trim()
            || !password.trim()
        ) {

            setError(
                "Email and Password can't be empty"
            );

            return;
        }

        try {

            setLoading(true);

            setError("");

            const response =
                await loginUser(
                    email,
                    password
                );

            console.log(response);

            /* ---------- TOKEN ---------- */

            localStorage.setItem(
                "accessToken",
                response.data.accessToken
            );

            /* ---------- USER ---------- */

            setUser({

                email:
                    response.data.email,

                role:
                    response.data.role,

                subscriptionType:
                    "FREE",

                id:response.data.id,

                freeInterviewUsed: response.data.freeInterviewUsed,

                publicId: response.data.publicId,

                fullName: null
            });

            /* ---------- NAVIGATE ---------- */

            navigate("/home");

        } catch (error: any) {

            console.log(error);

            setError(
                error?.response?.data?.message
                || "Login Failed"
            );

        } finally {

            setLoading(false);
        }
    };

    const handleRegister = () => {

        navigate("/register");
    };

    return (

        <div className="
            min-h-screen
            pt-16
            overflow-hidden
            bg-gradient-to-br
            from-black
            via-zinc-900
            to-black
            flex
            items-center
            justify-center
            px-4
            relative
        ">

            {/* Glow Top Left */}

            <div className="
                absolute
                top-[-120px]
                left-[-120px]
                w-[260px]
                h-[260px]
                sm:w-[320px]
                sm:h-[320px]
                bg-white/10
                blur-3xl
                rounded-full
            " />

            {/* Glow Bottom Right */}

            <div className="
                absolute
                bottom-[-120px]
                right-[-120px]
                w-[260px]
                h-[260px]
                sm:w-[320px]
                sm:h-[320px]
                bg-purple-500/10
                blur-3xl
                rounded-full
            " />

            {/* Main Card */}

            <div className="
                relative
                z-10
                w-full
                max-w-md
                mx-auto
                backdrop-blur-xl
                bg-white/10
                border
                border-white/10
                rounded-3xl
                p-6
                sm:p-8
                md:p-10
                shadow-2xl
            ">

                {/* Logo */}

                <div className="
                    flex
                    flex-col
                    items-center
                    mb-6
                    sm:mb-8
                ">

                    <div className="
                        w-14
                        h-14
                        sm:w-16
                        sm:h-16
                        rounded-2xl
                        bg-white
                        text-black
                        flex
                        items-center
                        justify-center
                        text-2xl
                        sm:text-3xl
                        font-bold
                        mb-4
                    ">

                        M

                    </div>

                    <h1 className="
                        text-3xl
                        sm:text-4xl
                        md:text-5xl
                        font-bold
                        text-white
                        tracking-tight
                        text-center
                    ">

                        MikiMock

                    </h1>

                    <p className="
                        text-zinc-400
                        mt-2
                        text-center
                        text-sm
                        sm:text-base
                    ">

                        Mock Interviews for
                        Real Placements

                    </p>

                </div>

                {/* Fixed Error Space */}

                <div className="
                    h-[52px]
                    mb-4
                ">

                    {
                        error
                            ? (
                                <div className="
                                    bg-red-500/20
                                    border
                                    border-red-500/30
                                    text-red-300
                                    px-4
                                    py-2
                                    rounded-xl
                                    text-sm
                                    h-full
                                    flex
                                    items-center
                                ">

                                    {error}

                                </div>
                            )
                            : (
                                <div className="
                                    h-full
                                " />
                            )
                    }

                </div>

                {/* Form */}

                <div className="
                    flex
                    flex-col
                    gap-4
                    sm:gap-5
                ">

                    {/* Email */}

                    <div>

                        <label className="
                            text-sm
                            text-zinc-300
                            mb-2
                            block
                        ">

                            Email

                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                            className="
                                w-full
                                p-4
                                rounded-2xl
                                bg-white/10
                                border
                                border-white/10
                                text-white
                                placeholder-zinc-500
                                outline-none
                                focus:border-white
                                focus:ring-2
                                focus:ring-white/20
                                transition-all
                            "
                        />

                    </div>

                    {/* Password */}

                    <div>

                        <label className="
                            text-sm
                            text-zinc-300
                            mb-2
                            block
                        ">

                            Password

                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            className="
                                w-full
                                p-4
                                rounded-2xl
                                bg-white/10
                                border
                                border-white/10
                                text-white
                                placeholder-zinc-500
                                outline-none
                                focus:border-white
                                focus:ring-2
                                focus:ring-white/20
                                transition-all
                            "
                        />

                    </div>

                    {/* Buttons */}

                    <div className="
                        flex
                        flex-col
                        sm:flex-row
                        gap-4
                        mt-2
                    ">

                        {/* Login Button */}

                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className="
                                flex-1
                                bg-white
                                hover:bg-zinc-200
                                text-black
                                font-bold
                                py-4
                                rounded-2xl
                                transition-all
                                duration-300
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                                text-base
                                sm:text-lg
                            "
                        >

                            {
                                loading
                                    ? "Signing In..."
                                    : "Login"
                            }

                        </button>

                        {/* Register Button */}

                        <button
                            onClick={handleRegister}
                            className="
                                flex-1
                                bg-transparent
                                border
                                border-white/20
                                hover:bg-white/10
                                text-white
                                font-bold
                                py-4
                                rounded-2xl
                                transition-all
                                duration-300
                                text-base
                                sm:text-lg
                            "
                        >

                            Register

                        </button>

                    </div>

                </div>

                {/* Footer */}

                <div className="
                    mt-6
                    sm:mt-8
                    text-center
                    text-xs
                    sm:text-sm
                    text-zinc-500
                ">

                    © 2026 MikiMock.
                    Crack Interviews Faster.

                </div>

            </div>

        </div>
    );
};

export default LoginPage;