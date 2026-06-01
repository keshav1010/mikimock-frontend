import { useNavigate } from
    "react-router-dom";

import { useTheme } from
    "../context/ThemeContext";

import heroImage from
    "../assets/images/Gemini_Generated_Image_17r3ud17r3ud17r3.png";

const HomePage = () => {

    const navigate =
        useNavigate();

    const { theme } =
        useTheme();

    const isDark =
        theme === "dark";

    return (

        <div className={`
            min-h-screen
            overflow-hidden
            transition-all
            duration-300
            ${
                isDark
                    ? `
                        bg-black
                        text-white
                      `
                    : `
                        bg-white
                        text-black
                      `
            }
        `}>

            {/* HERO SECTION */}

            <section className="
                relative
                min-h-screen
                flex
                items-center
                justify-center
                px-6
                pt-28
            ">

                {/* Background Glow */}

                <div className={`
                    absolute
                    top-[-120px]
                    left-[-120px]
                    w-[300px]
                    h-[300px]
                    blur-3xl
                    rounded-full
                    ${
                        isDark
                            ? "bg-purple-500/20"
                            : "bg-purple-300/30"
                    }
                `} />

                <div className={`
                    absolute
                    bottom-[-120px]
                    right-[-120px]
                    w-[300px]
                    h-[300px]
                    blur-3xl
                    rounded-full
                    ${
                        isDark
                            ? "bg-white/10"
                            : "bg-black/10"
                    }
                `} />

                <div className="
                    relative
                    z-10
                    max-w-7xl
                    w-full
                    grid
                    grid-cols-1
                    lg:grid-cols-2
                    gap-16
                    items-center
                ">

                    {/* LEFT CONTENT */}

                    <div className="
                        flex
                        flex-col
                        gap-8
                    ">

                        <div>

                            <p className={`
                                font-semibold
                                tracking-widest
                                uppercase
                                mb-4
                                ${
                                    isDark
                                        ? "text-purple-400"
                                        : "text-purple-700"
                                }
                            `}>

                                AI Powered Mock Interviews

                            </p>

                            <h1 className="
                                text-5xl
                                md:text-7xl
                                font-black
                                leading-tight
                            ">

                                Crack Your

                                <span className={`
                                    text-transparent
                                    bg-clip-text
                                    bg-gradient-to-r
                                    ${
                                        isDark
                                            ? `
                                                from-white
                                                to-zinc-500
                                              `
                                            : `
                                                from-black
                                                to-zinc-500
                                              `
                                    }
                                `}>
                                    {" "}Dream Job
                                </span>

                            </h1>

                        </div>

                        <p className={`
                            text-lg
                            md:text-xl
                            leading-relaxed
                            max-w-2xl
                            ${
                                isDark
                                    ? "text-zinc-400"
                                    : "text-zinc-600"
                            }
                        `}>

                            Practice real interview
                            questions, compete with
                            peers, improve confidence,
                            and become placement ready
                            with MikiMock.

                        </p>

                        {/* BUTTONS */}

                        <div className="
                            flex
                            flex-col
                            sm:flex-row
                            gap-5
                        ">

                            <button
                                onClick={() =>
                                    navigate("/practice")
                                }
                                className={`
                                    px-8
                                    py-4
                                    rounded-2xl
                                    font-bold
                                    text-lg
                                    hover:scale-105
                                    transition-all
                                    duration-300
                                    ${
                                        isDark
                                            ? `
                                                bg-white
                                                text-black
                                                hover:bg-zinc-200
                                              `
                                            : `
                                                bg-black
                                                text-white
                                                hover:bg-zinc-800
                                              `
                                    }
                                `}
                            >

                                Start Practicing

                            </button>

                            <button
                                onClick={() =>
                                    navigate("/premium")
                                }
                                className={`
                                    border
                                    px-8
                                    py-4
                                    rounded-2xl
                                    font-bold
                                    text-lg
                                    transition-all
                                    duration-300
                                    ${
                                        isDark
                                            ? `
                                                border-white/20
                                                hover:bg-white/10
                                              `
                                            : `
                                                border-black/20
                                                hover:bg-black/5
                                              `
                                    }
                                `}
                            >

                                Explore Premium

                            </button>

                        </div>

                        {/* STATS */}

                        <div className="
                            grid
                            grid-cols-1
                            sm:grid-cols-3
                            gap-4
                            pt-8
                        ">

                            {
                                [
                                    {
                                        title: "10K+",
                                        desc:
                                            "Interviews Taken"
                                    },
                                    {
                                        title: "95%",
                                        desc:
                                            "Confidence Boost"
                                    },
                                    {
                                        title: "24/7",
                                        desc:
                                            "Practice Access"
                                    }
                                ].map((item) => (

                                    <div
                                        key={item.title}
                                        className={`
                                            border
                                            rounded-2xl
                                            p-5
                                            backdrop-blur-xl
                                            ${
                                                isDark
                                                    ? `
                                                        bg-white/5
                                                        border-white/10
                                                      `
                                                    : `
                                                        bg-black/[0.03]
                                                        border-black/10
                                                      `
                                            }
                                        `}
                                    >

                                        <h2 className="
                                            text-3xl
                                            font-black
                                        ">

                                            {
                                                item.title
                                            }

                                        </h2>

                                        <p className={`
                                            text-sm
                                            mt-2
                                            ${
                                                isDark
                                                    ? "text-zinc-400"
                                                    : "text-zinc-600"
                                            }
                                        `}>

                                            {
                                                item.desc
                                            }

                                        </p>

                                    </div>
                                ))
                            }

                        </div>

                    </div>

                    {/* RIGHT IMAGE */}

                    <div className="
                        flex
                        items-center
                        justify-center
                    ">

                        <img
                            src={heroImage}
                            alt="MikiMock"
                            className="
                                w-full
                                max-w-2xl
                                object-contain
                                drop-shadow-2xl
                                rounded-3xl
                            "
                        />

                    </div>

                </div>

            </section>

            {/* FEATURES */}

            <section className="
                px-6
                py-24
            ">

                <div className="
                    max-w-7xl
                    mx-auto
                ">

                    <h2 className="
                        text-4xl
                        md:text-5xl
                        font-black
                        text-center
                        mb-16
                    ">

                        Why Choose MikiMock?

                    </h2>

                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-3
                        gap-8
                    ">

                        {
                            [
                                {
                                    title:
                                        "Real Experience",

                                    desc:
                                        "Simulate real company interview environments with peer-to-peer mock sessions."
                                },
                                {
                                    title:
                                        "AI Feedback",

                                    desc:
                                        "Receive intelligent feedback on confidence, communication and problem solving."
                                },
                                {
                                    title:
                                        "Placement Ready",

                                    desc:
                                        "Improve DSA, HR rounds, system design and communication before actual interviews."
                                }
                            ].map((item) => (

                                <div
                                    key={item.title}
                                    className={`
                                        border
                                        rounded-3xl
                                        p-8
                                        transition-all
                                        duration-300
                                        hover:scale-[1.02]
                                        ${
                                            isDark
                                                ? `
                                                    bg-white/5
                                                    border-white/10
                                                  `
                                                : `
                                                    bg-black/[0.03]
                                                    border-black/10
                                                  `
                                        }
                                    `}
                                >

                                    <h3 className="
                                        text-2xl
                                        font-bold
                                        mb-4
                                    ">

                                        {
                                            item.title
                                        }

                                    </h3>

                                    <p className={`
                                        leading-relaxed
                                        ${
                                            isDark
                                                ? "text-zinc-400"
                                                : "text-zinc-600"
                                        }
                                    `}>

                                        {
                                            item.desc
                                        }

                                    </p>

                                </div>
                            ))
                        }

                    </div>

                </div>

            </section>

            {/* FOOTER */}

            <footer className={`
                border-t
                px-6
                py-16
                ${
                    isDark
                        ? `
                            border-white/10
                            bg-black
                          `
                        : `
                            border-black/10
                            bg-white
                          `
                }
            `}>

                <div className="
                    max-w-7xl
                    mx-auto
                    grid
                    grid-cols-1
                    md:grid-cols-4
                    gap-12
                ">

                    {/* BRAND */}

                    <div>

                        <h2 className="
                            text-3xl
                            font-black
                            mb-4
                        ">

                            MikiMock

                        </h2>

                        <p className={`
                            leading-relaxed
                            ${
                                isDark
                                    ? "text-zinc-400"
                                    : "text-zinc-600"
                            }
                        `}>

                            Helping students crack
                            interviews through real
                            practice and AI-powered
                            learning.

                        </p>

                    </div>

                    {/* FOOTER SECTIONS */}

                    {
                        [
                            {
                                title: "Product",
                                items: [
                                    "Practice",
                                    "Premium",
                                    "Learnings"
                                ]
                            },
                            {
                                title: "Company",
                                items: [
                                    "About Us",
                                    "Contact",
                                    "Careers"
                                ]
                            },
                            {
                                title: "Legal",
                                items: [
                                    "Privacy Policy",
                                    "Terms & Conditions",
                                    "Refund Policy"
                                ]
                            }
                        ].map((section) => (

                            <div
                                key={section.title}
                            >

                                <h3 className="
                                    text-xl
                                    font-bold
                                    mb-5
                                ">

                                    {
                                        section.title
                                    }

                                </h3>

                                <div className={`
                                    flex
                                    flex-col
                                    gap-3
                                    ${
                                        isDark
                                            ? "text-zinc-400"
                                            : "text-zinc-600"
                                    }
                                `}>

                                    {
                                        section.items.map(
                                            (item) => (

                                                <button
                                                    key={item}
                                                    className="
                                                        text-left
                                                        hover:opacity-70
                                                        transition-all
                                                    "
                                                >

                                                    {item}

                                                </button>
                                            )
                                        )
                                    }

                                </div>

                            </div>
                        ))
                    }

                </div>

                <div className={`
                    border-t
                    mt-12
                    pt-8
                    text-center
                    text-sm
                    ${
                        isDark
                            ? `
                                border-white/10
                                text-zinc-500
                              `
                            : `
                                border-black/10
                                text-zinc-600
                              `
                    }
                `}>

                    © 2026 MikiMock.
                    All Rights Reserved.

                </div>

            </footer>

        </div>
    );
};

export default HomePage;