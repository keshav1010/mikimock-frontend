import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

import {
    useState,
    useEffect,
    useRef
} from "react";

const Navbar = () => {

    const { user, logout } =
        useAuth();

    const { theme, toggleTheme } =
        useTheme();

    const navigate =
        useNavigate();

    const [menuOpen, setMenuOpen] =
        useState(false);

    const [profileOpen, setProfileOpen] =
        useState(false);

    const profileRef =
        useRef<HTMLDivElement>(null);

    /* NAVIGATION */

    const handleNavigate = (
        path: string
    ) => {

        setMenuOpen(false);

        setProfileOpen(false);

        navigate(path);
    };

    /* LOGOUT */

    const handleLogout = () => {

        setMenuOpen(false);

        setProfileOpen(false);

        logout();
    };

    /* CLOSE PROFILE DROPDOWN */

    useEffect(() => {

        const handleClickOutside = (
            event: MouseEvent
        ) => {

            if (
                profileRef.current &&
                !profileRef.current.contains(
                    event.target as Node
                )
            ) {

                setProfileOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };

    }, []);

    return (

        <nav className={`
            fixed
            top-0
            left-0
            w-full
            z-50
            backdrop-blur-xl
            border-b
            transition-all
            duration-300
            ${
                theme === "dark"
                    ? `
                        bg-black/70
                        border-white/10
                      `
                    : `
                        bg-white/80
                        border-black/10
                        shadow-lg
                      `
            }
        `}>

            {/* NAVBAR CONTAINER */}

            <div className="
                max-w-7xl
                mx-auto
                px-4
                sm:px-6
                py-4
                flex
                items-center
                justify-between
            ">

                {/* LOGO */}

                <div
                    onClick={() =>
                        handleNavigate(
                            user
                                ? "/home"
                                : "/"
                        )
                    }
                    className="
                        flex
                        items-center
                        gap-3
                        cursor-pointer
                        shrink-0
                    "
                >

                    {/* LOGO ICON */}

                    <div className={`
                        w-10
                        h-10
                        sm:w-11
                        sm:h-11
                        rounded-2xl
                        flex
                        items-center
                        justify-center
                        font-bold
                        text-lg
                        sm:text-xl
                        ${
                            theme === "dark"
                                ? "bg-white text-black"
                                : "bg-black text-white"
                        }
                    `}>

                        M

                    </div>

                    {/* LOGO TEXT */}

                    <div>

                        <h1 className={`
                            text-xl
                            sm:text-2xl
                            font-bold
                            tracking-tight
                            ${
                                theme === "dark"
                                    ? "text-white"
                                    : "text-black"
                            }
                        `}>

                            MikiMock

                        </h1>

                        <p className={`
                            text-[10px]
                            sm:text-xs
                            ${
                                theme === "dark"
                                    ? "text-zinc-400"
                                    : "text-zinc-600"
                            }
                        `}>

                            Crack Interviews Faster

                        </p>

                    </div>

                </div>

                {/* DESKTOP MENU */}

                <div className="
                    hidden
                    md:flex
                    items-center
                    gap-6
                    lg:gap-8
                ">

                    {/* NAV ITEMS */}

                    <button
                        onClick={() =>
                            handleNavigate("/practice")
                        }
                        className={`
                            transition-all
                            ${
                                theme === "dark"
                                    ? `
                                        text-zinc-300
                                        hover:text-white
                                      `
                                    : `
                                        text-zinc-700
                                        hover:text-black
                                      `
                            }
                        `}
                    >

                        Practice

                    </button>

                    <button
                        onClick={() =>
                            handleNavigate("/learnings")
                        }
                        className={`
                            transition-all
                            ${
                                theme === "dark"
                                    ? `
                                        text-zinc-300
                                        hover:text-white
                                      `
                                    : `
                                        text-zinc-700
                                        hover:text-black
                                      `
                            }
                        `}
                    >

                        Learnings

                    </button>

                    <button
                        onClick={() =>
                            handleNavigate("/about")
                        }
                        className={`
                            transition-all
                            ${
                                theme === "dark"
                                    ? `
                                        text-zinc-300
                                        hover:text-white
                                      `
                                    : `
                                        text-zinc-700
                                        hover:text-black
                                      `
                            }
                        `}
                    >

                        About Us

                    </button>

                    {/* THEME BUTTON */}

                    <button
                        onClick={toggleTheme}
                        className={`
                            px-4
                            py-2
                            rounded-2xl
                            border
                            transition-all
                            ${
                                theme === "dark"
                                    ? `
                                        bg-white/10
                                        border-white/10
                                        text-white
                                        hover:bg-white/20
                                      `
                                    : `
                                        bg-black/5
                                        border-black/10
                                        text-black
                                        hover:bg-black/10
                                      `
                            }
                        `}
                    >

                        {
                            theme === "dark"
                                ? "☀️ Light"
                                : "🌙 Dark"
                        }

                    </button>

                    {/* USER SECTION */}

                    {
                        user ? (

                            <div
                                ref={profileRef}
                                className="
                                    relative
                                "
                            >

                                {/* PROFILE BUTTON */}

                                <button
                                    onClick={() =>
                                        setProfileOpen(
                                            !profileOpen
                                        )
                                    }
                                    className={`
                                        relative
                                        flex
                                        items-center
                                        gap-3
                                        px-3
                                        py-2
                                        rounded-2xl
                                        transition-all
                                        border
                                        ${
                                            user?.subscriptionType === "PREMIUM"
                                                ? `
                                                    bg-yellow-500/10
                                                    border-yellow-400/30
                                                    hover:bg-yellow-500/20
                                                  `
                                                : `
                                                    ${
                                                        theme === "dark"
                                                            ? `
                                                                bg-white/10
                                                                border-white/10
                                                                hover:bg-white/15
                                                              `
                                                            : `
                                                                bg-black/5
                                                                border-black/10
                                                                hover:bg-black/10
                                                              `
                                                    }
                                                  `
                                        }
                                    `}
                                >

                                    {/* PREMIUM STAR */}

                                    {
                                        user?.subscriptionType ===
                                        "PREMIUM" && (

                                            <div className="
                                                absolute
                                                -top-2
                                                -right-2
                                                w-6
                                                h-6
                                                rounded-full
                                                bg-gradient-to-br
                                                from-yellow-300
                                                to-yellow-500
                                                flex
                                                items-center
                                                justify-center
                                                text-black
                                                text-xs
                                                font-bold
                                                shadow-lg
                                                animate-pulse
                                            ">

                                                ★

                                            </div>
                                        )
                                    }

                                    {/* AVATAR */}

                                    <div className={`
                                        w-10
                                        h-10
                                        rounded-full
                                        flex
                                        items-center
                                        justify-center
                                        font-bold
                                        ${
                                            theme === "dark"
                                                ? "bg-white text-black"
                                                : "bg-black text-white"
                                        }
                                    `}>

                                        {
                                            user?.email
                                                ?.charAt(0)
                                                ?.toUpperCase()
                                        }

                                    </div>

                                    {/* EMAIL */}

                                    <div className="
                                        hidden
                                        lg:block
                                        text-left
                                    ">

                                        <p className={`
                                            text-sm
                                            font-medium
                                            max-w-[150px]
                                            truncate
                                            ${
                                                theme === "dark"
                                                    ? "text-white"
                                                    : "text-black"
                                            }
                                        `}>

                                            {
                                                user?.email
                                            }

                                        </p>

                                        {
                                            user?.subscriptionType ===
                                            "PREMIUM"
                                                ? (
                                                    <p className="
                                                        text-yellow-400
                                                        text-xs
                                                        font-semibold
                                                    ">

                                                        ★ PREMIUM

                                                    </p>
                                                )
                                                : (
                                                    <p className={`
                                                        text-xs
                                                        ${
                                                            theme === "dark"
                                                                ? "text-zinc-400"
                                                                : "text-zinc-600"
                                                        }
                                                    `}>

                                                        USER

                                                    </p>
                                                )
                                        }

                                    </div>

                                </button>

                                {/* DROPDOWN */}

                                {
                                    profileOpen && (

                                        <div className={`
                                            absolute
                                            right-0
                                            top-16
                                            w-72
                                            backdrop-blur-2xl
                                            border
                                            rounded-3xl
                                            shadow-2xl
                                            p-4
                                            flex
                                            flex-col
                                            gap-2
                                            ${
                                                theme === "dark"
                                                    ? `
                                                        bg-zinc-900/95
                                                        border-white/10
                                                      `
                                                    : `
                                                        bg-white/95
                                                        border-black/10
                                                      `
                                            }
                                        `}>

                                            <button
                                                onClick={() =>
                                                    handleNavigate("/profile")
                                                }
                                                className={`
                                                    text-left
                                                    px-4
                                                    py-3
                                                    rounded-2xl
                                                    transition-all
                                                    ${
                                                        theme === "dark"
                                                            ? `
                                                                text-zinc-200
                                                                hover:bg-white/10
                                                              `
                                                            : `
                                                                text-black
                                                                hover:bg-black/5
                                                              `
                                                    }
                                                `}
                                            >

                                                Profile

                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleNavigate("/settings")
                                                }
                                                className={`
                                                    text-left
                                                    px-4
                                                    py-3
                                                    rounded-2xl
                                                    transition-all
                                                    ${
                                                        theme === "dark"
                                                            ? `
                                                                text-zinc-200
                                                                hover:bg-white/10
                                                              `
                                                            : `
                                                                text-black
                                                                hover:bg-black/5
                                                              `
                                                    }
                                                `}
                                            >

                                                Settings

                                            </button>

                                            {
                                                user?.subscriptionType !==
                                                "PREMIUM" && (

                                                    <button
                                                        onClick={() =>
                                                            handleNavigate("/premium")
                                                        }
                                                        className="
                                                            text-left
                                                            px-4
                                                            py-3
                                                            rounded-2xl
                                                            bg-yellow-500/10
                                                            hover:bg-yellow-500/20
                                                            text-yellow-400
                                                            transition-all
                                                            font-semibold
                                                        "
                                                    >

                                                        ⭐ Get Premium

                                                    </button>
                                                )
                                            }

                                            <button
                                                onClick={() =>
                                                    handleNavigate("/about")
                                                }
                                                className={`
                                                    text-left
                                                    px-4
                                                    py-3
                                                    rounded-2xl
                                                    transition-all
                                                    ${
                                                        theme === "dark"
                                                            ? `
                                                                text-zinc-200
                                                                hover:bg-white/10
                                                              `
                                                            : `
                                                                text-black
                                                                hover:bg-black/5
                                                              `
                                                    }
                                                `}
                                            >

                                                About Us

                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleNavigate("/contact")
                                                }
                                                className={`
                                                    text-left
                                                    px-4
                                                    py-3
                                                    rounded-2xl
                                                    transition-all
                                                    ${
                                                        theme === "dark"
                                                            ? `
                                                                text-zinc-200
                                                                hover:bg-white/10
                                                              `
                                                            : `
                                                                text-black
                                                                hover:bg-black/5
                                                              `
                                                    }
                                                `}
                                            >

                                                Contacts

                                            </button>

                                            <button
                                                onClick={handleLogout}
                                                className="
                                                    text-left
                                                    px-4
                                                    py-3
                                                    rounded-2xl
                                                    bg-red-500/10
                                                    hover:bg-red-500/20
                                                    text-red-400
                                                    transition-all
                                                    mt-2
                                                "
                                            >

                                                Logout

                                            </button>

                                        </div>

                                    )
                                }

                            </div>

                        ) : (

                            <button
                                onClick={() =>
                                    handleNavigate("/")
                                }
                                className={`
                                    px-6
                                    py-2.5
                                    rounded-2xl
                                    font-semibold
                                    transition-all
                                    ${
                                        theme === "dark"
                                            ? `
                                                bg-white
                                                hover:bg-zinc-200
                                                text-black
                                              `
                                            : `
                                                bg-black
                                                hover:bg-zinc-800
                                                text-white
                                              `
                                    }
                                `}
                            >

                                Login / Register

                            </button>

                        )
                    }

                </div>

                {/* MOBILE BUTTON */}

                <button
                    onClick={() =>
                        setMenuOpen(!menuOpen)
                    }
                    className={`
                        md:hidden
                        text-3xl
                        ${
                            theme === "dark"
                                ? "text-white"
                                : "text-black"
                        }
                    `}
                >

                    ☰

                </button>

            </div>

            {/* MOBILE MENU */}

            {
                menuOpen && (

                    <div className={`
                        md:hidden
                        px-6
                        pb-6
                        flex
                        flex-col
                        gap-4
                        border-t
                        ${
                            theme === "dark"
                                ? `
                                    bg-black/95
                                    border-white/10
                                  `
                                : `
                                    bg-white/95
                                    border-black/10
                                  `
                        }
                    `}>

                        <button
                            onClick={toggleTheme}
                            className={`
                                py-3
                                rounded-2xl
                                font-semibold
                                transition-all
                                ${
                                    theme === "dark"
                                        ? `
                                            bg-white/10
                                            text-white
                                          `
                                        : `
                                            bg-black/5
                                            text-black
                                          `
                                }
                            `}
                        >

                            {
                                theme === "dark"
                                    ? "☀️ Light Mode"
                                    : "🌙 Dark Mode"
                            }

                        </button>

                    </div>

                )
            }

        </nav>
    );
};

export default Navbar;