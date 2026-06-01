import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import api from "../api/axios";

import {
    connectSocket,
    disconnectSocket
} from "../services/websocketService";

import {
    useAuth
} from "../context/AuthContext";

export const useMatchmaking = () => {

    const navigate =
        useNavigate();

    const { user } =
        useAuth();

    const [matching, setMatching] =
        useState(false);

    const startMatching =
        async () => {

        try {

            console.log("Join clicked");

            setMatching(true);

            const joinResponse =
                await api.post(
                    "/practice/join"
                );

            console.log(
                "Join API response:",
                joinResponse.data
            );

            const status =
                joinResponse.data?.data?.status;

            if (
                status !== "Matching"
            ) {

                console.log(
                    "Join status is not MATCHING:",
                    status
                );

                setMatching(false);

                return;
            }

            if (!user?.id) {

                console.log(
                    "User publicId missing",
                    user
                );

                setMatching(false);

                return;
            }

            const token =
                localStorage.getItem(
                    "accessToken"
                );

            const client =
                connectSocket(
                    token || ""
                );

            console.log(
                "Connecting websocket..."
            );

            client.onConnect =
                () => {

                    console.log(
                        "WebSocket connected"
                    );

                    const destination =
                        `/topic/match/${user.id}`;

                    console.log(
                        "Subscribing to:",
                        destination
                    );

                    client.subscribe(
                        destination,
                        async (message) => {

                            console.log(
                                "WebSocket message received:",
                                message.body
                            );

                            const data =
                                JSON.parse(
                                    message.body
                                );

                            if (
                                data.event !==
                                "MATCH_FOUND"
                            ) {

                                console.log(
                                    "Unknown event:",
                                    data
                                );

                                return;
                            }

                            console.log(
                                "Match found:",
                                data
                            );

                            const roomCode =
                                data.roomCode;

                            if (!roomCode) {

                                console.log(
                                    "roomCode missing in websocket event"
                                );

                                setMatching(false);

                                return;
                            }

                            const roomResponse =
                                await api.get(
                                    `/practice/${roomCode}/token`,
                                );

                            console.log(
                                "Room token response:",
                                roomResponse.data
                            );

                            const roomData =
                                roomResponse.data;

                            disconnectSocket();

                            setMatching(false);

                            navigate(
                                "/interview-room",
                                {
                                    state: {
                                        appId:
                                            roomData.appId,

                                        channelName:
                                            roomData.channelName,

                                        token:
                                            roomData.token,

                                        uid:
                                            roomData.uid
                                    }
                                }
                            );
                        }
                    );
                };

            client.onStompError =
                (frame) => {

                    console.log(
                        "STOMP error:",
                        frame
                    );

                    setMatching(false);
                };

            client.onWebSocketError =
                (error) => {

                    console.log(
                        "WebSocket error:",
                        error
                    );

                    setMatching(false);
                };

        } catch (error) {

            console.log(
                "Join/matchmaking error:",
                error
            );

            setMatching(false);

            disconnectSocket();
        }
    };

    useEffect(() => {

        return () => {

            disconnectSocket();
        };

    }, []);

    return {
        matching,
        startMatching
    };
};