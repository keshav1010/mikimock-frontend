import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    CalendarDays,
    MapPin,
    Trophy,
    Briefcase,
    Mail,
    Pencil
} from "lucide-react";

import { useTheme } from
    "../context/ThemeContext";

import api from "../api/axios";

const ProfilePage = () => {

    const { theme } =
        useTheme();

    const isDark =
        theme === "dark";

    /* --------------------------------
       STATES
    -------------------------------- */

    const [profile, setProfile] =
        useState<any>(null);

    const [interviews, setInterviews] =
        useState<any[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [activeTab, setActiveTab] =
        useState("profile");

    const [sortBy, setSortBy] =
        useState("date");

    const [statusFilter, setStatusFilter] =
        useState("ALL");

    const [saving, setSaving] =
        useState(false);

    /* --------------------------------
       THEME
    -------------------------------- */

    const pageBg =
        isDark
            ? "bg-[#0d1117] text-white"
            : "bg-[#f6f8fa] text-black";

    const cardBg =
        isDark
            ? `
                bg-[#161b22]
                border-[#30363d]
              `
            : `
                bg-white
                border-[#d0d7de]
              `;

    const inputBg =
        isDark
            ? `
                bg-[#0d1117]
                border-[#30363d]
                text-white
              `
            : `
                bg-white
                border-[#d0d7de]
                text-black
              `;

    const secondaryText =
        isDark
            ? "text-[#8b949e]"
            : "text-[#57606a]";

    /* --------------------------------
       FETCH PROFILE
    -------------------------------- */

    const fetchProfile =
        async () => {

        try {

            const response =
                await api.get(
                    "/hiring/my-profile"
                );

            setProfile(
                response.data.data
            );

        } catch (error) {

            console.log(error);

            setProfile(null);
        }
    };

    /* --------------------------------
       FETCH INTERVIEWS
    -------------------------------- */

    const fetchInterviews =
        async () => {

        try {

            const response =
                await api.get(
                    "/hiring/my-interview"
                );

            setInterviews(
                response.data.data || []
            );

        } catch (error) {

            console.log(error);

            setInterviews([]);
        }
    };

    /* --------------------------------
       LOAD DATA
    -------------------------------- */

    useEffect(() => {

        const loadData =
            async () => {

            setLoading(true);

            await Promise.all([
                fetchProfile(),
                fetchInterviews()
            ]);

            setLoading(false);
        };

        loadData();

    }, []);

    /* --------------------------------
       USERNAME
    -------------------------------- */

    const username =
        useMemo(() => {

        if (!profile?.email) {
            return "user";
        }

        return profile.email
            .split("@")[0];

    }, [profile]);

    /* --------------------------------
       FILTERED INTERVIEWS
    -------------------------------- */

    const filteredInterviews =
        useMemo(() => {

        let data =
            [...interviews];

        if (
            statusFilter !== "ALL"
        ) {

            data =
                data.filter(
                    (item) =>
                        item.status
                        === statusFilter
                );
        }

        if (
            sortBy === "date"
        ) {

            data.sort(
                (a, b) =>
                    new Date(
                        b.scheduledAt
                    ).getTime()
                    -
                    new Date(
                        a.scheduledAt
                    ).getTime()
            );
        }

        if (
            sortBy === "topic"
        ) {

            data.sort(
                (a, b) =>
                    a.topic.localeCompare(
                        b.topic
                    )
            );
        }

        if (
            sortBy === "level"
        ) {

            data.sort(
                (a, b) =>
                    a.level.localeCompare(
                        b.level
                    )
            );
        }

        return data;

    }, [
        interviews,
        sortBy,
        statusFilter
    ]);

    /* --------------------------------
       SAVE PROFILE
    -------------------------------- */

    const handleSaveProfile =
        async () => {

        try {

            setSaving(true);

            await api.put(
                "/hiring/update-profile",
                profile
            );

        } catch (error) {

            console.log(error);

        } finally {

            setSaving(false);
        }
    };

    /* --------------------------------
       LEETCODE STYLE CALENDAR
    -------------------------------- */

    const generateHeatmap =
        () => {

        const activityMap =
            new Map();

        interviews.forEach(
            (item) => {

                const date =
                    new Date(
                        item.scheduledAt
                    )
                        .toISOString()
                        .split("T")[0];

                activityMap.set(
                    date,
                    (
                        activityMap.get(date)
                        || 0
                    ) + 1
                );
            }
        );

        const boxes = [];

        for (
            let i = 364;
            i >= 0;
            i--
        ) {

            const date =
                new Date();

            date.setDate(
                date.getDate() - i
            );

            const formatted =
                date
                    .toISOString()
                    .split("T")[0];

            const count =
                activityMap.get(
                    formatted
                ) || 0;

            let color =
                isDark
                    ? "bg-[#161b22]"
                    : "bg-[#ebedf0]";

            if (count === 1) {

                color =
                    isDark
                        ? "bg-[#0e4429]"
                        : "bg-[#9be9a8]";
            }

            if (count === 2) {

                color =
                    isDark
                        ? "bg-[#006d32]"
                        : "bg-[#40c463]";
            }

            if (count >= 3) {

                color =
                    isDark
                        ? "bg-[#26a641]"
                        : "bg-[#30a14e]";
            }

            boxes.push(

                <div
                    key={i}
                    title={`${formatted} • ${count} interview(s)`}
                    className={`
                        w-[11px]
                        h-[11px]
                        rounded-[2px]
                        ${color}
                    `}
                />
            );
        }

        return boxes;
    };

    /* --------------------------------
       LOADING
    -------------------------------- */

    if (loading) {

        return (

            <div className={`
                min-h-screen
                flex
                items-center
                justify-center
                text-lg
                font-semibold
                ${pageBg}
            `}>

                Loading Profile...

            </div>
        );
    }

    return (

        <div className={`
            min-h-screen
            pt-24
            pb-20
            px-4
            lg:px-10
            transition-all
            duration-300
            ${pageBg}
        `}>

            <div className="
                max-w-7xl
                mx-auto
                grid
                grid-cols-1
                lg:grid-cols-[320px_1fr]
                gap-8
            ">

                {/* SIDEBAR */}

                <div className={`
                    rounded-2xl
                    border
                    p-6
                    h-fit
                    sticky
                    top-24
                    ${cardBg}
                `}>

                    {/* AVATAR */}

                    <div className="
                        w-20
                        h-20
                        rounded-full
                        bg-[#238636]
                        flex
                        items-center
                        justify-center
                        text-3xl
                        font-black
                        text-white
                        mx-auto
                    ">

                        {
                            username
                                ?.charAt(0)
                                ?.toUpperCase()
                        }

                    </div>

                    <div className="
                        text-center
                        mt-5
                    ">

                        <h2 className="
                            text-2xl
                            font-bold
                        ">

                            @{username}

                        </h2>

                        <p className={`
                            mt-2
                            text-sm
                            ${secondaryText}
                        `}>

                            {
                                profile?.headline
                                || "No headline added"
                            }

                        </p>

                    </div>

                    {/* USER INFO */}

                    <div className="
                        mt-8
                        space-y-4
                    ">

                        <div className="
                            flex
                            items-center
                            gap-3
                            text-sm
                        ">

                            <Trophy size={16} />

                            <span>

                                Rank #
                                {
                                    profile?.rank
                                    || 0
                                }

                            </span>

                        </div>

                        <div className="
                            flex
                            items-center
                            gap-3
                            text-sm
                        ">

                            <Briefcase size={16} />

                            <span>

                                {
                                    profile?.experience
                                    || "No experience"
                                }

                            </span>

                        </div>

                        <div className="
                            flex
                            items-center
                            gap-3
                            text-sm
                        ">

                            <MapPin size={16} />

                            <span>

                                {
                                    profile?.currentLocation
                                    || "No location"
                                }

                            </span>

                        </div>

                        <div className="
                            flex
                            items-center
                            gap-3
                            text-sm
                        ">

                            <Mail size={16} />

                            <span>

                                {
                                    profile?.email
                                }

                            </span>

                        </div>

                    </div>

                </div>

                {/* RIGHT */}

                <div>

                    {/* HEATMAP */}

                    <div className={`
                        rounded-2xl
                        border
                        p-6
                        ${cardBg}
                    `}>

                        <div className="
                            flex
                            items-center
                            justify-between
                            mb-6
                        ">

                            <div>

                                <h2 className="
                                    text-2xl
                                    font-bold
                                ">

                                    Interview Activity

                                </h2>

                                <p className={`
                                    mt-1
                                    text-sm
                                    ${secondaryText}
                                `}>

                                    {
                                        interviews.length
                                    }
                                    {" "}
                                    interviews in the last year

                                </p>

                            </div>

                            <CalendarDays size={22} />

                        </div>

                        {/* MONTH LABELS */}

                        <div className="
                            flex
                            justify-between
                            text-xs
                            mb-2
                            px-1
                            text-[#8b949e]
                        ">

                            <span>Jan</span>
                            <span>Feb</span>
                            <span>Mar</span>
                            <span>Apr</span>
                            <span>May</span>
                            <span>Jun</span>
                            <span>Jul</span>
                            <span>Aug</span>
                            <span>Sep</span>
                            <span>Oct</span>
                            <span>Nov</span>
                            <span>Dec</span>

                        </div>

                        {/* GRID */}

                        <div className="
                            grid
                            grid-flow-col
                            grid-rows-7
                            gap-[3px]
                            overflow-x-auto
                        ">

                            {
                                generateHeatmap()
                            }

                        </div>

                        {/* LEGEND */}

                        <div className="
                            flex
                            items-center
                            justify-end
                            gap-2
                            mt-5
                            text-xs
                            text-[#8b949e]
                        ">

                            <span>
                                Less
                            </span>

                            <div className="
                                w-[11px]
                                h-[11px]
                                rounded-[2px]
                                bg-[#161b22]
                            " />

                            <div className="
                                w-[11px]
                                h-[11px]
                                rounded-[2px]
                                bg-[#0e4429]
                            " />

                            <div className="
                                w-[11px]
                                h-[11px]
                                rounded-[2px]
                                bg-[#006d32]
                            " />

                            <div className="
                                w-[11px]
                                h-[11px]
                                rounded-[2px]
                                bg-[#26a641]
                            " />

                            <span>
                                More
                            </span>

                        </div>

                    </div>

                    {/* TABS */}

                    <div className="
                        flex
                        gap-4
                        mt-8
                        mb-8
                    ">

                        <button
                            onClick={() =>
                                setActiveTab(
                                    "profile"
                                )
                            }
                            className={`
                                px-5
                                py-2.5
                                rounded-lg
                                text-sm
                                font-medium
                                transition-all
                                ${
                                    activeTab ===
                                    "profile"
                                        ? `
                                            bg-[#238636]
                                            text-white
                                          `
                                        : isDark
                                            ? `
                                                bg-[#161b22]
                                              `
                                            : `
                                                bg-white
                                              `
                                }
                            `}
                        >

                            Profile Details

                        </button>

                        <button
                            onClick={() =>
                                setActiveTab(
                                    "interviews"
                                )
                            }
                            className={`
                                px-5
                                py-2.5
                                rounded-lg
                                text-sm
                                font-medium
                                transition-all
                                ${
                                    activeTab ===
                                    "interviews"
                                        ? `
                                            bg-[#238636]
                                            text-white
                                          `
                                        : isDark
                                            ? `
                                                bg-[#161b22]
                                              `
                                            : `
                                                bg-white
                                              `
                                }
                            `}
                        >

                            Interviews

                        </button>

                    </div>

                    {/* PROFILE */}

                    {
                        activeTab ===
                        "profile" && (

                            <div className={`
                                rounded-2xl
                                border
                                p-6
                                space-y-5
                                ${cardBg}
                            `}>

                                <div className="
                                    flex
                                    items-center
                                    justify-between
                                ">

                                    <h2 className="
                                        text-2xl
                                        font-bold
                                    ">

                                        Profile Details

                                    </h2>

                                    <Pencil size={18} />

                                </div>

                                {/* INPUTS */}

                                {
                                    [
                                        {
                                            label: "Full Name",
                                            key: "fullName"
                                        },
                                        {
                                            label: "Headline",
                                            key: "headline"
                                        },
                                        {
                                            label: "Skills",
                                            key: "skills"
                                        },
                                        {
                                            label: "Experience",
                                            key: "experience"
                                        },
                                        {
                                            label: "Current Location",
                                            key: "currentLocation"
                                        },
                                        {
                                            label: "Preferred Location",
                                            key: "preferredLocation"
                                        },
                                        {
                                            label: "Country",
                                            key: "country"
                                        }
                                    ].map((field) => (

                                        <div
                                            key={field.key}
                                        >

                                            <label className="
                                                block
                                                mb-2
                                                text-sm
                                                font-medium
                                            ">

                                                {
                                                    field.label
                                                }

                                            </label>

                                            <input
                                                value={
                                                    profile?.[
                                                        field.key
                                                    ]
                                                    || ""
                                                }
                                                onChange={(e) =>
                                                    setProfile({
                                                        ...profile,
                                                        [field.key]:
                                                            e.target.value
                                                    })
                                                }
                                                className={`
                                                    w-full
                                                    p-3
                                                    rounded-lg
                                                    border
                                                    text-sm
                                                    ${inputBg}
                                                `}
                                            />

                                        </div>
                                    ))
                                }

                                {/* BIO */}

                                <div>

                                    <label className="
                                        block
                                        mb-2
                                        text-sm
                                        font-medium
                                    ">

                                        Bio

                                    </label>

                                    <textarea
                                        rows={5}
                                        value={
                                            profile?.bio
                                            || ""
                                        }
                                        onChange={(e) =>
                                            setProfile({
                                                ...profile,
                                                bio:
                                                    e.target.value
                                            })
                                        }
                                        className={`
                                            w-full
                                            p-3
                                            rounded-lg
                                            border
                                            text-sm
                                            resize-none
                                            ${inputBg}
                                        `}
                                    />

                                </div>

                                {/* SAVE */}

                                <button
                                    onClick={
                                        handleSaveProfile
                                    }
                                    className="
                                        bg-[#238636]
                                        hover:bg-[#2ea043]
                                        text-white
                                        px-6
                                        py-3
                                        rounded-lg
                                        text-sm
                                        font-medium
                                        transition-all
                                    "
                                >

                                    {
                                        saving
                                            ? "Saving..."
                                            : "Save Profile"
                                    }

                                </button>

                            </div>
                        )
                    }

                    {/* INTERVIEWS */}

                    {
                        activeTab ===
                        "interviews" && (

                            <div className={`
                                rounded-2xl
                                border
                                p-6
                                ${cardBg}
                            `}>

                                {/* FILTERS */}

                                <div className="
                                    flex
                                    flex-wrap
                                    gap-4
                                    mb-6
                                ">

                                    <select
                                        value={sortBy}
                                        onChange={(e) =>
                                            setSortBy(
                                                e.target.value
                                            )
                                        }
                                        className={`
                                            px-4
                                            py-2.5
                                            rounded-lg
                                            border
                                            text-sm
                                            ${inputBg}
                                        `}
                                    >

                                        <option value="date">
                                            Sort By Date
                                        </option>

                                        <option value="level">
                                            Sort By Level
                                        </option>

                                        <option value="topic">
                                            Sort By Topic
                                        </option>

                                    </select>

                                    <select
                                        value={
                                            statusFilter
                                        }
                                        onChange={(e) =>
                                            setStatusFilter(
                                                e.target.value
                                            )
                                        }
                                        className={`
                                            px-4
                                            py-2.5
                                            rounded-lg
                                            border
                                            text-sm
                                            ${inputBg}
                                        `}
                                    >

                                        <option value="ALL">
                                            All
                                        </option>

                                        <option value="COMPLETED">
                                            Completed
                                        </option>

                                        <option value="NO_SHOW">
                                            No Show
                                        </option>

                                    </select>

                                </div>

                                {/* EMPTY */}

                                {
                                    filteredInterviews.length === 0 ? (

                                        <div className={`
                                            text-center
                                            py-16
                                            rounded-xl
                                            border
                                            ${inputBg}
                                        `}>

                                            <h3 className="
                                                text-xl
                                                font-semibold
                                                mb-2
                                            ">

                                                No Interviews Found

                                            </h3>

                                            <p className={
                                                secondaryText
                                            }>

                                                Completed interviews
                                                will appear here.

                                            </p>

                                        </div>

                                    ) : (

                                        <div className="
                                            overflow-x-auto
                                        ">

                                            <table className="
                                                w-full
                                                text-sm
                                            ">

                                                <thead>

                                                    <tr className={`
                                                        border-b
                                                        ${
                                                            isDark
                                                                ? `
                                                                    border-[#30363d]
                                                                  `
                                                                : `
                                                                    border-[#d0d7de]
                                                                  `
                                                        }
                                                    `}>

                                                        <th className="
                                                            py-4
                                                            text-left
                                                        ">
                                                            #
                                                        </th>

                                                        <th className="
                                                            py-4
                                                            text-left
                                                        ">
                                                            Problem
                                                        </th>

                                                        <th className="
                                                            py-4
                                                            text-left
                                                        ">
                                                            Topic
                                                        </th>

                                                        <th className="
                                                            py-4
                                                            text-left
                                                        ">
                                                            Level
                                                        </th>

                                                        <th className="
                                                            py-4
                                                            text-left
                                                        ">
                                                            Date
                                                        </th>

                                                        <th className="
                                                            py-4
                                                            text-left
                                                        ">
                                                            Status
                                                        </th>

                                                    </tr>

                                                </thead>

                                                <tbody>

                                                    {
                                                        filteredInterviews.map(
                                                            (
                                                                item,
                                                                index
                                                            ) => (

                                                                <tr
                                                                    key={index}
                                                                    className={`
                                                                        border-b
                                                                        ${
                                                                            isDark
                                                                                ? `
                                                                                    border-[#21262d]
                                                                                  `
                                                                                : `
                                                                                    border-[#f0f3f6]
                                                                                  `
                                                                        }
                                                                    `}
                                                                >

                                                                    <td className="
                                                                        py-5
                                                                    ">
                                                                        {
                                                                            item.interviewNo
                                                                        }
                                                                    </td>

                                                                    <td className="
                                                                        py-5
                                                                    ">
                                                                        {
                                                                            item.problem
                                                                        }
                                                                    </td>

                                                                    <td className="
                                                                        py-5
                                                                    ">
                                                                        {
                                                                            item.topic
                                                                        }
                                                                    </td>

                                                                    <td className="
                                                                        py-5
                                                                    ">
                                                                        {
                                                                            item.level
                                                                        }
                                                                    </td>

                                                                    <td className="
                                                                        py-5
                                                                    ">

                                                                        {
                                                                            new Date(
                                                                                item.scheduledAt
                                                                            )
                                                                                .toLocaleString()
                                                                        }

                                                                    </td>

                                                                    <td className="
                                                                        py-5
                                                                    ">

                                                                        <span className={`
                                                                            px-3
                                                                            py-1
                                                                            rounded-full
                                                                            text-xs
                                                                            font-semibold
                                                                            ${
                                                                                item.status ===
                                                                                "COMPLETED"
                                                                                    ? `
                                                                                        bg-green-500/20
                                                                                        text-green-400
                                                                                      `
                                                                                    : `
                                                                                        bg-red-500/20
                                                                                        text-red-400
                                                                                      `
                                                                            }
                                                                        `}>

                                                                            {
                                                                                item.status
                                                                            }

                                                                        </span>

                                                                    </td>

                                                                </tr>
                                                            )
                                                        )
                                                    }

                                                </tbody>

                                            </table>

                                        </div>
                                    )
                                }

                            </div>
                        )
                    }

                </div>

            </div>

        </div>
    );
};

export default ProfilePage;