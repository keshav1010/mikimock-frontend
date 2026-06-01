import {
    useEffect,
    // useMemo,
    useState
} from "react";

import {useMatchmaking} from "../hooks/useMatchmaking";

import MatchmakingModal
from "../components/MatchmakingModal";

// import { Client } from "@stomp/stompjs";

// import { useAuth } from "../context/AuthContext";

// import { useNavigate } from "react-router-dom";

import { useTheme } from
    "../context/ThemeContext";

import interviewImage from
    "../assets/images/Interview_Image.png";

import api from "../api/axios";




const PracticePage = () => {

    // const navigate =
    //     useNavigate();

    const { theme } =
        useTheme();

        const {
            matching,
            startMatching
        } = useMatchmaking();



    //------------------------------------
    //    COUNTDOWN
    //----------------------------------------

        const getRemainingTime = (scheduledTime: string) => {

    const diff =
        new Date(scheduledTime).getTime()
        - Date.now();

    if (diff <= 0) {
        return "LIVE";
    }

    const hours =
        Math.floor(diff / (1000 * 60 * 60));

    const minutes =
        Math.floor(
            (diff % (1000 * 60 * 60))
            / (1000 * 60)
        );

    const seconds =
        Math.floor(
            (diff % (1000 * 60))
            / 1000
        );

    return `${hours}h ${minutes}m ${seconds}s`;
    };

    const [, setTick] = useState(0);

    useEffect(() => {

    const interval =
        setInterval(() => {

            setTick(prev => prev + 1);

        }, 1000);

    return () =>
        clearInterval(interval);

}, []);

    /* --------------------------------
       THEME
    -------------------------------- */

    const isDark =
        theme === "dark";

    const bgClass =
        isDark
            ? "bg-black text-white"
            : "bg-zinc-100 text-black";

    const cardClass =
        isDark
            ? `
                bg-white/5
                border-white/10
                hover:bg-white/10
              `
            : `
                bg-white
                border-zinc-200
                hover:bg-zinc-50
                shadow-sm
              `;

    const secondaryText =
        isDark
            ? "text-zinc-400"
            : "text-zinc-600";

    const modalBg =
        isDark
            ? "bg-zinc-900"
            : "bg-white";

    const inputClass =
        isDark
            ? `
                bg-white/5
                border-white/10
                text-white
              `
            : `
                bg-zinc-100
                border-zinc-300
                text-black
              `;

    /* --------------------------------
       STATES
    -------------------------------- */

    const [interviews, setInterviews] =
        useState<any[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [showTopicModal, setShowTopicModal] =
        useState(false);

    const [showLevelModal, setShowLevelModal] =
        useState(false);

    const [showTimeModal, setShowTimeModal] =
        useState(false);

    const [showConfirmModal, setShowConfirmModal] =
        useState(false);

    const [selectedTopic, setSelectedTopic] =
        useState("");

    const [selectedLevel, setSelectedLevel] =
        useState("");

    const [selectedDate, setSelectedDate] =
        useState("");

    const [selectedTime, setSelectedTime] =
        useState("");

    const [scheduling, setScheduling] =
        useState(false);

    const [notification, setNotification] =
        useState<{
            type: "success" | "error";
            message: string;
        } | null>(null);


    /* --------------------------------
       CONSTANTS
    -------------------------------- */

    const topics = [
        "DSA",
        "System Design",
        "Java Development",
        "Data Analyst",
        "Managerial"
    ];

    const levels = [
        "BEGINNER",
        "MEDIUM",
        "ADVANCED",
        "EXPERT"
    ];

    const timeSlots = [
        "08:00",
        "10:00",
        "12:00",
        "14:00",
        "16:00",
        "20:00",
        "24:00"
    ];

    /* --------------------------------
       NOTIFICATION AUTO CLOSE
    -------------------------------- */

    useEffect(() => {

        if (!notification) {
            return;
        }

        const timer =
            setTimeout(() => {

                setNotification(null);

            }, 3500);

        return () =>
            clearTimeout(timer);

    }, [notification]);

    /* --------------------------------
       FETCH INTERVIEWS
    -------------------------------- */

    const fetchInterviews =
        async () => {

        try {

            setLoading(true);

            const response =
                await api.get(
                    "/practice/scheduled-future-interviews"
                );

            setInterviews(
                response.data.data || []
            );

        } catch (error) {

            console.log(error);

            setNotification({
                type: "error",
                message:
                    "Unable to fetch interviews"
            });

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {

        fetchInterviews();

    }, []);

    /* --------------------------------
       DATE FORMAT
    -------------------------------- */

    // const formatDateTime = (
    //     time: string
    // ) => {

    //     try {

    //         return new Date(time)
    //             .toLocaleString();

    //     } catch {

    //         return time;
    //     }
    // };

    /* --------------------------------
       FUTURE INTERVIEW
    -------------------------------- */

    const isFutureInterview = (
    scheduledTime: string
) => {

    return (
        new Date(scheduledTime).getTime()
        > Date.now()
    );
};

    /* --------------------------------
       LIVE INTERVIEW
    -------------------------------- */

    const isLiveInterview = (
    scheduledTime: string
) => {

    return (
        new Date(scheduledTime).getTime()
        <= Date.now()
    );
};

    /* --------------------------------
       STATUS STYLE
    -------------------------------- */

    const getStatusStyle = (
        status: string
    ) => {

        switch (status) {

            case "COMPLETED":

                return `
                    bg-green-500/20
                    text-green-400
                    border-green-500/20
                `;

            case "PENDING":

                return `
                    bg-yellow-500/20
                    text-yellow-400
                    border-yellow-500/20
                `;

            case "LIVE":

                return `
                    bg-blue-500/20
                    text-blue-400
                    border-blue-500/20
                `;

            default:

                return `
                    bg-zinc-500/20
                    text-zinc-300
                    border-zinc-500/20
                `;
        }
    };

    /* --------------------------------
       TOPIC SELECT
    -------------------------------- */

    const handleTopicSelect = (
        topic: string
    ) => {

        setSelectedTopic(topic);

        setShowTopicModal(false);

        setShowLevelModal(true);
    };

    /* --------------------------------
       LEVEL SELECT
    -------------------------------- */

    const handleLevelSelect = (
        level: string
    ) => {

        setSelectedLevel(level);

        setShowLevelModal(false);

        setShowTimeModal(true);
    };

    /* --------------------------------
       TIME VALIDATION
    -------------------------------- */

    const isTimeDisabled = (
        time: string
    ) => {

        if (!selectedDate) {
            return true;
        }

        const now =
            new Date();

        const selectedDateTime =
            new Date(
                `${selectedDate}T${time}:00`
            );

        const minAllowedTime =
            new Date(
                now.getTime()
                + 15 * 60 * 1000
            );

        return (
            selectedDateTime
            <= minAllowedTime
        );
    };

    /* --------------------------------
       TIME SELECT
    -------------------------------- */

    const handleTimeSelect = (
        time: string
    ) => {

        if (
            isTimeDisabled(time)
        ) {
            return;
        }

        setSelectedTime(time);

        setShowTimeModal(false);

        setShowConfirmModal(true);
    };

    /* --------------------------------
       SCHEDULE INTERVIEW
    -------------------------------- */

    const handleScheduleInterview =
        async () => {

        try {

            setScheduling(true);

            const dateTime =
                `${selectedDate}T${selectedTime}:00`;

            const response =
                await api.post(
                    "/practice/schedule-interview",
                    {
                        topic:
                            selectedTopic,

                        level:
                            selectedLevel,

                        time:
                            dateTime
                    }
                );

            if (
                response.data.success
            ) {

                setNotification({
                    type: "success",
                    message:
                        "Interview scheduled successfully"
                });

                setShowConfirmModal(false);

                setSelectedTopic("");
                setSelectedLevel("");
                setSelectedDate("");
                setSelectedTime("");

                fetchInterviews();

            } else {

                setNotification({
                    type: "error",
                    message:
                        response.data.message
                });
            }

        } catch (error: any) {

            console.log(error);

            const backendMessage =
                error?.response?.data?.data?.time
                || error?.response?.data?.message
                || "Scheduling failed";

            setNotification({
                type: "error",
                message:
                    backendMessage
            });

        } finally {

            setScheduling(false);
        }
    };

    /* --------------------------------
       JOIN INTERVIEW
    -------------------------------- */

    // const handleJoinInterview =
    //     async () => {

    //     try {

    //         setShowMatchingModal(true);

    //         setMatchingLoading(true);

    //         setMatchedRoomData(null);

    //         const response =
    //             await api.post(
    //                 "/practice/join"
    //             );

    //         if (
    //             response.data.success
    //         ) {

    //             const roomData =
    //                 response.data.data;

    //             if (
    //                 roomData.roomCode
    //             ) {

    //                 setMatchedRoomData(
    //                     roomData
    //                 );

    //                 setNotification({
    //                     type: "success",
    //                     message:
    //                         "Match found successfully"
    //                 });

    //             } else {

    //                 setNotification({
    //                     type: "error",
    //                     message:
    //                         "Still searching for candidate..."
    //                 });
    //             }

    //         } else {

    //             setNotification({
    //                 type: "error",
    //                 message:
    //                     "Unable to join interview"
    //             });
    //         }

    //     } catch (error) {

    //         console.log(error);

    //         setNotification({
    //             type: "error",
    //             message:
    //                 "Not able to join interview"
    //         });

    //     } finally {

    //         setMatchingLoading(false);
    //     }
    // };

    /* --------------------------------
       JOIN ROOM
    -------------------------------- */

    // const handleEnterRoom =
    //     () => {

    //     if (!matchedRoomData) {
    //         return;
    //     }

    //     navigate(
    //         `/interview-room/${matchedRoomData.roomCode}`,
    //         {
    //             state: matchedRoomData
    //         }
    //     );
    // };

    return (

        <div className={`
            min-h-screen
            pt-28
            px-4
            sm:px-6
            lg:px-12
            pb-20
            transition-all
            duration-300
            ${bgClass}
        `}>

            {/* -------------------------------- */}
            {/* NOTIFICATION */}
            {/* -------------------------------- */}

            {
                notification && (

                    <div className={`
                        fixed
                        top-24
                        right-5
                        z-[100]
                        px-6
                        py-4
                        rounded-2xl
                        font-semibold
                        shadow-2xl
                        border
                        transition-all
                        ${
                            notification.type ===
                            "success"
                                ? `
                                    bg-green-500
                                    text-black
                                    border-green-400
                                  `
                                : `
                                    bg-red-500
                                    text-white
                                    border-red-400
                                  `
                        }
                    `}>

                        {
                            notification.message
                        }

                    </div>
                )
            }

            {/* HERO */}

            <div className="
                max-w-7xl
                mx-auto
                grid
                grid-cols-1
                lg:grid-cols-2
                gap-14
                items-center
                mb-20
            ">

                <div>

                    <h1 className="
                        text-5xl
                        md:text-6xl
                        font-black
                        leading-tight
                    ">

                        Practice Real
                        <span className="
                            text-green-500
                        ">
                            {" "}Mock Interviews
                        </span>

                    </h1>

                    <p className={`
                        text-lg
                        mt-6
                        leading-relaxed
                        ${secondaryText}
                    `}>

                        Get interviewed by
                        real candidates and
                        improve confidence.

                    </p>

                    <button
                        onClick={() =>
                            setShowTopicModal(true)
                        }
                        className="
                            mt-8
                            bg-green-500
                            hover:bg-green-400
                            text-black
                            px-8
                            py-4
                            rounded-2xl
                            font-bold
                            text-lg
                            transition-all
                            hover:scale-105
                        "
                    >

                        Schedule Interview

                    </button>

                </div>

                <div className="
                    flex
                    justify-center
                ">

                    <img
                        src={interviewImage}
                        alt="Interview"
                        className="
                            w-full
                            max-w-xl
                            object-contain
                        "
                    />

                </div>

            </div>

            {/* INTERVIEW LIST */}

            <div className="
                max-w-7xl
                mx-auto
            ">

                <h2 className="
                    text-4xl
                    font-bold
                    mb-8
                ">

                    Your Interviews

                </h2>

                {
                    loading ? (

                        <div>
                            Loading...
                        </div>

                    ) : interviews.length === 0 ? (

                        <div className={`
                            border
                            rounded-3xl
                            p-10
                            text-center
                            ${cardClass}
                        `}>

                            No interviews found

                        </div>

                    ) : (

                        <div className="
                            grid
                            grid-cols-1
                            lg:grid-cols-2
                            gap-6
                        ">

                            {
                                interviews.map(
                                    (
                                        item,
                                        index
                                    ) => (

                                    <div
                                        key={index}
                                        className={`
                                            border
                                            rounded-3xl
                                            p-6
                                            transition-all
                                            ${
                                                isFutureInterview(
                                                    item.scheduledTime
                                                )
                                                    ? `
                                                        border-green-500/40
                                                        shadow-[0_0_30px_rgba(34,197,94,0.15)]
                                                      `
                                                    : ""
                                            }
                                            ${cardClass}
                                        `}
                                    >

                                        <div className="
                                            flex
                                            justify-between
                                            items-start
                                        ">

                                            <div>

                                                <h3 className="
                                                    text-2xl
                                                    font-bold
                                                ">

                                                    {
                                                        item.topic
                                                    }

                                                </h3>

                                                <p className={
                                                    secondaryText
                                                }>

                                                    {
                                                        item.problem                      //1st 
                                                    }

                                                </p>

                                            </div>

                                            <div className={`
                                                px-4
                                                py-2
                                                rounded-full
                                                border
                                                text-sm
                                                font-semibold
                                                ${getStatusStyle(
                                                    item.status
                                                )}
                                            `}>

                                                {
                                                    item.status
                                                }

                                            </div>

                                        </div>

                                        <div className="
                                            mt-6
                                        ">

                                            <p className={`
                                                text-sm
                                                ${secondaryText}
                                            `}>

                                                Interview Time
                                                <div className="mt-4">

                                                    <p className="text-sm text-green-500">
                                                        Starts In
                                                    </p>

                                                    <p className="font-bold text-xl">
                                                        {
                                                            getRemainingTime(
                                                                item.scheduledTime
                                                            )
                                                        }
                                                    </p>

                                                </div>

                                            </p>

                                            <p className="
                                                mt-2
                                                font-semibold
                                            ">
                                            Level: {item.level}
                                                

                                            </p>

                                        </div>

                                        {
                                            isLiveInterview(
                                                item.scheduledTime
                                            ) && (

                                                <button
                                                    onClick={
                                                        startMatching
                                                    }
                                                    className="
                                                        mt-6
                                                        w-full
                                                        bg-green-500
                                                        hover:bg-green-400
                                                        text-black
                                                        py-4
                                                        rounded-2xl
                                                        font-bold
                                                        text-lg
                                                        transition-all
                                                    "
                                                >

                                                    Join Interview

                                                </button>
                                            )
                                        }

                                    </div>
                                ))
                            }

                        </div>
                    )
                }

            </div>

            {/* TOPIC MODAL */}

            {
                showTopicModal && (

                    <div className="
                        fixed
                        inset-0
                        bg-black/80
                        backdrop-blur-md
                        z-50
                        flex
                        items-center
                        justify-center
                        p-4
                    ">

                        <div className={`
                            w-full
                            max-w-2xl
                            rounded-3xl
                            p-8
                            border
                            ${modalBg}
                            ${
                                isDark
                                    ? "border-white/10"
                                    : "border-zinc-300"
                            }
                        `}>

                            <div className="
                                flex
                                justify-between
                                items-center
                                mb-8
                            ">

                                <h2 className="
                                    text-3xl
                                    font-bold
                                ">

                                    Select Topic

                                </h2>

                                <button
                                    onClick={() =>
                                        setShowTopicModal(false)
                                    }
                                    className="
                                        text-3xl
                                        font-bold
                                        hover:text-red-500
                                        hover:scale-125
                                        transition-all
                                    "
                                >
                                    ×
                                </button>

                            </div>

                            <div className="
                                grid
                                grid-cols-1
                                sm:grid-cols-2
                                gap-4
                            ">

                                {
                                    topics.map(
                                        (topic) => (

                                        <button
                                            key={topic}
                                            onClick={() =>
                                                handleTopicSelect(
                                                    topic
                                                )
                                            }
                                            className={`
                                                border
                                                rounded-2xl
                                                p-5
                                                text-left
                                                font-semibold
                                                hover:border-green-500
                                                hover:scale-[1.02]
                                                transition-all
                                                ${cardClass}
                                            `}
                                        >

                                            {topic}

                                        </button>
                                    ))
                                }

                            </div>

                        </div>

                    </div>
                )
            }

            {/* LEVEL MODAL */}

            {
                showLevelModal && (

                    <div className="
                        fixed
                        inset-0
                        bg-black/80
                        backdrop-blur-md
                        z-50
                        flex
                        items-center
                        justify-center
                        p-4
                    ">

                        <div className={`
                            w-full
                            max-w-xl
                            rounded-3xl
                            p-8
                            border
                            ${modalBg}
                            ${
                                isDark
                                    ? "border-white/10"
                                    : "border-zinc-300"
                            }
                        `}>

                            <div className="
                                flex
                                justify-between
                                items-center
                                mb-8
                            ">

                                <h2 className="
                                    text-3xl
                                    font-bold
                                ">

                                    Select Level

                                </h2>

                                <button
                                    onClick={() =>
                                        setShowLevelModal(false)
                                    }
                                    className="
                                        text-3xl
                                        font-bold
                                        hover:text-red-500
                                        hover:scale-125
                                        transition-all
                                    "
                                >
                                    ×
                                </button>

                            </div>

                            <div className="
                                flex
                                flex-col
                                gap-4
                            ">

                                {
                                    levels.map(
                                        (level) => (

                                        <button
                                            key={level}
                                            onClick={() =>
                                                handleLevelSelect(
                                                    level
                                                )
                                            }
                                            className={`
                                                border
                                                rounded-2xl
                                                p-5
                                                text-left
                                                font-semibold
                                                hover:border-green-500
                                                hover:scale-[1.02]
                                                transition-all
                                                ${cardClass}
                                            `}
                                        >

                                            {level}

                                        </button>
                                    ))
                                }

                            </div>

                        </div>

                    </div>
                )
            }

            {/* TIME MODAL */}

            {
                showTimeModal && (

                    <div className="
                        fixed
                        inset-0
                        bg-black/80
                        backdrop-blur-md
                        z-50
                        flex
                        items-center
                        justify-center
                        p-4
                    ">

                        <div className={`
                            w-full
                            max-w-xl
                            rounded-3xl
                            p-8
                            border
                            ${modalBg}
                            ${
                                isDark
                                    ? "border-white/10"
                                    : "border-zinc-300"
                            }
                        `}>

                            <div className="
                                flex
                                justify-between
                                items-center
                                mb-6
                            ">

                                <h2 className="
                                    text-3xl
                                    font-bold
                                ">

                                    Select Time

                                </h2>

                                <button
                                    onClick={() =>
                                        setShowTimeModal(false)
                                    }
                                    className="
                                        text-3xl
                                        font-bold
                                        hover:text-red-500
                                        hover:scale-125
                                        transition-all
                                    "
                                >
                                    ×
                                </button>

                            </div>

                            <input
                                type="date"
                                min={
                                    new Date()
                                        .toISOString()
                                        .split("T")[0]
                                }
                                value={selectedDate}
                                onChange={(e) =>
                                    setSelectedDate(
                                        e.target.value
                                    )
                                }
                                className={`
                                    w-full
                                    border
                                    rounded-2xl
                                    p-4
                                    mb-6
                                    ${inputClass}
                                `}
                            />

                            <div className="
                                grid
                                grid-cols-2
                                sm:grid-cols-3
                                gap-4
                            ">

                                {
                                    timeSlots.map(
                                        (time) => {

                                        const disabled =
                                            isTimeDisabled(
                                                time
                                            );

                                        return (

                                            <button
                                                key={time}
                                                disabled={disabled}
                                                onClick={() =>
                                                    handleTimeSelect(
                                                        time
                                                    )
                                                }
                                                className={`
                                                    border
                                                    rounded-2xl
                                                    p-4
                                                    font-semibold
                                                    transition-all
                                                    ${
                                                        disabled
                                                            ? `
                                                                opacity-40
                                                                cursor-not-allowed
                                                              `
                                                            : `
                                                                hover:border-green-500
                                                                hover:scale-[1.03]
                                                              `
                                                    }
                                                    ${cardClass}
                                                `}
                                            >

                                                {time}

                                            </button>
                                        );
                                    })
                                }

                            </div>

                        </div>

                    </div>
                )
            }

            {/* CONFIRM MODAL */}

            {
                showConfirmModal && (

                    <div className="
                        fixed
                        inset-0
                        bg-black/80
                        backdrop-blur-md
                        z-50
                        flex
                        items-center
                        justify-center
                        p-4
                    ">

                        <div className={`
                            w-full
                            max-w-xl
                            rounded-3xl
                            p-8
                            border
                            ${modalBg}
                            ${
                                isDark
                                    ? "border-white/10"
                                    : "border-zinc-300"
                            }
                        `}>

                            <div className="
                                flex
                                justify-between
                                items-center
                                mb-8
                            ">

                                <h2 className="
                                    text-3xl
                                    font-bold
                                ">

                                    Confirm Interview

                                </h2>

                                <button
                                    onClick={() =>
                                        setShowConfirmModal(false)
                                    }
                                    className="
                                        text-3xl
                                        font-bold
                                        hover:text-red-500
                                        hover:scale-125
                                        transition-all
                                    "
                                >
                                    ×
                                </button>

                            </div>

                            <div className="
                                space-y-5
                                mb-8
                            ">

                                <div className="
                                    flex
                                    justify-between
                                ">

                                    <span className={
                                        secondaryText
                                    }>
                                        Topic
                                    </span>

                                    <span className="
                                        font-bold
                                    ">
                                        {selectedTopic}
                                    </span>

                                </div>

                                <div className="
                                    flex
                                    justify-between
                                ">

                                    <span className={
                                        secondaryText
                                    }>
                                        Level
                                    </span>

                                    <span className="
                                        font-bold
                                    ">
                                        {selectedLevel}
                                    </span>

                                </div>

                                <div className="
                                    flex
                                    justify-between
                                ">

                                    <span className={
                                        secondaryText
                                    }>
                                        Time
                                    </span>

                                    <span className="
                                        font-bold
                                    ">

                                        {selectedDate}
                                        {" "}
                                        {selectedTime}

                                    </span>

                                </div>

                            </div>

                            <button
                                onClick={
                                    handleScheduleInterview
                                }
                                disabled={scheduling}
                                className="
                                    w-full
                                    bg-green-500
                                    hover:bg-green-400
                                    text-black
                                    py-4
                                    rounded-2xl
                                    font-bold
                                    text-lg
                                "
                            >

                                {
                                    scheduling
                                        ? "Scheduling..."
                                        : "Confirm Interview"
                                }

                            </button>

                        </div>

                    </div>
                )
            }

            {/* MATCHING MODAL */}

            {/* {
                showMatchingModal && (

                    <div className="
                        fixed
                        inset-0
                        bg-black/90
                        backdrop-blur-xl
                        z-[70]
                        flex
                        items-center
                        justify-center
                        p-6
                    ">

                        <div className={`
                            w-full
                            max-w-3xl
                            rounded-[32px]
                            border
                            p-10
                            text-center
                            ${modalBg}
                            ${
                                isDark
                                    ? "border-white/10"
                                    : "border-zinc-300"
                            }
                        `}>

                            <button
                                onClick={() =>
                                    setShowMatchingModal(false)
                                }
                                className="
                                    absolute
                                    top-8
                                    right-8
                                    text-4xl
                                    font-bold
                                    hover:text-red-500
                                    transition-all
                                "
                            >
                                ×
                            </button>

                            {
                                matchingLoading ? (

                                    <>

                                        <div className="
                                            w-28
                                            h-28
                                            border-[10px]
                                            border-green-500/20
                                            border-t-green-500
                                            rounded-full
                                            animate-spin
                                            mx-auto
                                            mb-10
                                        " />

                                        <h2 className="
                                            text-5xl
                                            font-black
                                            mb-4
                                        ">

                                            Matching...

                                        </h2>

                                        <p className={`
                                            text-lg
                                            ${secondaryText}
                                        `}>

                                            Finding the best
                                            candidate for your
                                            interview room.

                                        </p>

                                    </>

                                ) : matchedRoomData ? (

                                    <>

                                        <div className="
                                            text-8xl
                                            mb-6
                                        ">
                                            🎉
                                        </div>

                                        <h2 className="
                                            text-5xl
                                            font-black
                                            mb-6
                                        ">

                                            Match Found

                                        </h2>

                                        <div className="
                                            space-y-3
                                            mb-10
                                        ">

                                            <p>

                                                Room Code:
                                                {" "}
                                                <span className="
                                                    text-green-500
                                                    font-bold
                                                ">
                                                    {
                                                        matchedRoomData.roomCode
                                                    }
                                                </span>

                                            </p>

                                        </div>

                                        <button
                                            onClick={
                                                handleEnterRoom
                                            }
                                            className="
                                                bg-green-500
                                                hover:bg-green-400
                                                text-black
                                                px-10
                                                py-5
                                                rounded-2xl
                                                text-xl
                                                font-black
                                                transition-all
                                            "
                                        >

                                            Join Room

                                        </button>

                                    </>

                                ) : (

                                    <>

                                        <div className="
                                            text-7xl
                                            mb-6
                                        ">
                                            😔
                                        </div>

                                        <h2 className="
                                            text-4xl
                                            font-black
                                            mb-4
                                        ">

                                            No Match Yet

                                        </h2>

                                        <p className={
                                            secondaryText
                                        }>

                                            Try again in a few
                                            moments.

                                        </p>

                                    </>
                                )
                            }

                        </div>

                    </div>
                )
            } */}

            <MatchmakingModal
                open={matching}
            />

        </div>
    );
};

export default PracticePage;