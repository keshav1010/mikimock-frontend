import {
    Client
} from "@stomp/stompjs";

import SockJS from "sockjs-client";

let stompClient: Client | null =
    null;

export const connectSocket =(token: string) => {
    const socketUrl = import.meta.env.VITE_WS_URL;

    stompClient =
        new Client({

            webSocketFactory: () =>
                new SockJS(
                    // "http://localhost:3333/Micki_Mock/ws"
                    socketUrl

                ),

            connectHeaders: {
                Authorization:
                    `Bearer ${token}`
            },

            reconnectDelay:
                5000,

            debug: (msg) => {
                console.log(
                    "STOMP:",
                    msg
                );
            }
        });

    stompClient.activate();

    return stompClient;
};

export const disconnectSocket =
() => {

    stompClient?.deactivate();

    stompClient = null;
};











// import {
//     Client
// } from "@stomp/stompjs";

// let stompClient: Client | null =
//     null;

// export const connectSocket =
// (
//     token: string
// ) => {

//     const wsUrl =
//         import.meta.env.VITE_WS_URL;

//     console.log(
//         "WS URL:",
//         wsUrl
//     );

//     if (!wsUrl) {
//         throw new Error(
//             "VITE_WS_URL missing in .env"
//         );
//     }

//     stompClient =
//         new Client({

//             brokerURL:
//                 wsUrl,

//             connectHeaders: {
//                 Authorization:
//                     `Bearer ${token}`
//             },

//             reconnectDelay:
//                 5000,

//             debug: (msg) => {
//                 console.log(
//                     "STOMP:",
//                     msg
//                 );
//             },

//             onConnect: () => {
//                 console.log(
//                     "✅ WebSocket connected"
//                 );
//             },

//             onStompError: (frame) => {
//                 console.error(
//                     "❌ STOMP error",
//                     frame
//                 );
//             },

//             onWebSocketError: (event) => {
//                 console.error(
//                     "❌ WebSocket error",
//                     event
//                 );
//             }
//         });

//     stompClient.activate();

//     return stompClient;
// };

// export const disconnectSocket =
// () => {

//     stompClient?.deactivate();

//     stompClient = null;
// };