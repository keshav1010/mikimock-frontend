import {
    useEffect,
    useRef,
    useState
} from "react";

import {
    getRoomTimer
} from "../services/RoomTimerService";

import {
    useLocation,
    useNavigate
} from "react-router-dom";


import AgoraRTC, {
    type IAgoraRTCClient,
    type ICameraVideoTrack,
    type IMicrophoneAudioTrack
} from "agora-rtc-sdk-ng";

import {
    markRoomJoined,
    markRoomLeft
} from "../services/roomPresenceService";



const InterviewRoom = () => {

    const location =
        useLocation();

    const navigate =
        useNavigate();

    const timerIntervalRef =
    useRef<number | null>(null);

    const localVideoRef =
        useRef<HTMLDivElement>(null);

    const remoteVideoRef =
        useRef<HTMLDivElement>(null);

    const clientRef =
        useRef<IAgoraRTCClient | null>(null);

    const localTracksRef =
        useRef<[
            IMicrophoneAudioTrack,
            ICameraVideoTrack
        ] | null>(null);

    const [joined, setJoined] =
        useState(false);

    const [remainingSeconds, setRemainingSeconds] =
        useState<number | null>(null);

        const formatTime = (
            seconds: number
        ) => {

            const mins =
                Math.floor(seconds / 60);

            const secs =
                seconds % 60;

            return `${mins}:${String(secs).padStart(2, "0")}`;
        };

    const roomData =
    location.state as {
        appId: string;
        channelName: string;
        token: string;
        uid: number;
        roomCode?: string;
    };
    const roomCode = roomData?.roomCode ?? roomData?.channelName;

    const hasLeftRef =
    useRef(false);

    const isMountedRef =
    useRef(true);

    const fetchTimerUntilStarted =
    async () => {

    if (timerIntervalRef.current) {
        return;
    }

    timerIntervalRef.current =
        window.setInterval(async () => {

            try {

                const timerResponse =
                    await getRoomTimer(
                        roomCode
                    );

                const seconds =
                    timerResponse
                        .data
                        .data
                        .remainingSeconds;

                console.log(
                    "Timer seconds =",
                    seconds
                );

                if (seconds !== null) {

                    setRemainingSeconds(
                        seconds
                    );

                    if (
                        timerIntervalRef.current
                    ) {

                        clearInterval(
                            timerIntervalRef.current
                        );

                        timerIntervalRef.current =
                            null;
                    }
                }

                    } catch (error) {

                        console.error(
                            "Timer fetch failed",
                            error
                        );
                    }

                }, 3000);
        };

    // ------------------------------------ Timer UseEffect --------------------
    useEffect(() => {

            if (remainingSeconds === null) {
                return;
            }

            if (remainingSeconds <= 0) {

                handleLeave();

                return;
            }

            const interval =
                setInterval(() => {

                    setRemainingSeconds(prev => {

                        if (prev === null) {
                            return null;
                        }

                        return Math.max(
                            0,
                            prev - 1
                        );
                    });

                }, 1000);

            return () =>
                clearInterval(interval);

        }, [remainingSeconds]);

    useEffect(() => {

        if (!roomData) {

            navigate("/practice");

            return;
        }

        const startCall =
            async () => {

            const client =
                AgoraRTC.createClient({
                    mode: "rtc",
                    codec: "vp8"
                });

            clientRef.current =
                client;

            client.on(
                "user-published",
                async (
                    user,
                    mediaType
                ) => {

                    await client.subscribe(
                        user,
                        mediaType
                    );

                    if (
                        mediaType === "video"
                        && remoteVideoRef.current
                    ) {

                        user.videoTrack?.play(
                            remoteVideoRef.current
                        );
                    }

                    if (
                        mediaType === "audio"
                    ) {

                        user.audioTrack?.play();
                    }
                }
            );

            client.on(
                "user-unpublished",
                () => {

                    if (
                        remoteVideoRef.current
                    ) {

                        remoteVideoRef.current.innerHTML =
                            "";
                    }
                }
            );

            await client.join(
                roomData.appId,
                roomData.channelName,
                roomData.token,
                roomData.uid
            );
            console.log("User Joins the call")

            const tracks =
                await AgoraRTC
                    .createMicrophoneAndCameraTracks();

            localTracksRef.current =
                tracks;

            if (
                localVideoRef.current
            ) {

                tracks[1].play(
                    localVideoRef.current
                );
            }

            await client.publish(
                tracks
            );
            await markRoomJoined(roomCode);
            
            setJoined(true);

            await fetchTimerUntilStarted();
        };

        startCall();

        return () => {

            // leaveCall();
            isMountedRef.current = false;
            cleanupMediaOnly();
        };

    }, []);

    const cleanupMediaOnly = async () => {

        if (localTracksRef.current) {

            if (timerIntervalRef.current) {

            clearInterval(timerIntervalRef.current
            );

            timerIntervalRef.current =
                null;
            }

        localTracksRef.current[0].stop();
        localTracksRef.current[0].close();

        localTracksRef.current[1].stop();
        localTracksRef.current[1].close();

        localTracksRef.current = null;
    }

    if (remoteVideoRef.current) {
        remoteVideoRef.current.innerHTML = "";
    }

    await clientRef.current?.leave();

        clientRef.current = null;
    };

    const leaveCall =
    async () => {

    if (hasLeftRef.current) {
        return;
    }

    hasLeftRef.current = true;

    try {

        await markRoomLeft(
            roomCode
        );

    } catch (error) {

        console.error(
            "Leave presence failed",
            error
        );
    }

    await cleanupMediaOnly();

    setJoined(false);
};

    const handleLeave =
        async () => {

        await leaveCall();

        navigate("/practice");
    };

    return (

        <div className="
            min-h-screen
            bg-black
            text-white
            pt-24
            px-6
            pb-10
        ">

            <div className="
                max-w-7xl
                mx-auto
            ">

                <div className="
                    flex
                    items-center
                    justify-between
                    mb-8
                ">

                    <div>

                        <h1 className="
                            text-4xl
                            font-black
                        ">

                            Interview Room

                        </h1>

                        <p className="
                            text-zinc-400
                            mt-2
                        ">

                            Channel:
                            {" "}
                            {roomData?.channelName}

                        </p>

                    </div>
                    {
                        remainingSeconds !== null && (

                            <p className="
                                text-green-400
                                mt-2
                                font-bold
                                text-xl
                            ">

                                Time Left:
                                {" "}
                                {formatTime(remainingSeconds)}

                            </p>
                        )
                    }

                    <button
                        onClick={handleLeave}
                        className="
                            bg-red-500
                            hover:bg-red-400
                            text-white
                            px-6
                            py-3
                            rounded-2xl
                            font-bold
                        "
                    >

                        Leave

                    </button>

                </div>

                <div className="
                    grid
                    grid-cols-1
                    lg:grid-cols-2
                    gap-6
                ">

                    <div className="
                        bg-zinc-900
                        border
                        border-white/10
                        rounded-3xl
                        overflow-hidden
                    ">

                        <div className="
                            p-4
                            border-b
                            border-white/10
                            font-bold
                        ">

                            You

                        </div>

                        <div
                            ref={localVideoRef}
                            className="
                                h-[420px]
                                bg-black
                            "
                        />

                    </div>

                    <div className="
                        bg-zinc-900
                        border
                        border-white/10
                        rounded-3xl
                        overflow-hidden
                    ">

                        <div className="
                            p-4
                            border-b
                            border-white/10
                            font-bold
                        ">

                            Partner

                        </div>

                        <div
                            ref={remoteVideoRef}
                            className="
                                h-[420px]
                                bg-black
                                flex
                                items-center
                                justify-center
                                text-zinc-500
                            "
                        >

                            {
                                joined && remainingSeconds === null && (

                                    <p className="
                                        text-yellow-400
                                        mt-2
                                        font-semibold
                                    ">

                                        Waiting for partner to join...

                                    </p>
                                )
                            }

                        </div>

                    </div>

                </div>

                {/* {
                    joined && (

                        <p className="
                            text-green-400
                            mt-6
                            font-semibold
                        ">

                            Connected to Agora room

                        </p>
                    )
                } */}

            </div>

        </div>
    );
};

export default InterviewRoom;


// import {
//     useLocation
// } from "react-router-dom";

// import { joinAgora }  from '../services/agoraService';
// import { useEffect } from "react";

// const InterviewRoom =
// () => {

//     const location =
//         useLocation();

//     const {
//         appId,
//         token,
//         channelName,
//         uid
//     } =
//         location.state;

//     useEffect(() => {

//         joinAgora(
//             appId,
//             token,
//             channelName,
//             uid
//         );

//     }, []);

//     return (
//         <div>
//             Video Room
//         </div>
//     );
// };

// export default InterviewRoom;