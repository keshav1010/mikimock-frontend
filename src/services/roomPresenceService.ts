import api from "../api/axios";

export const markRoomJoined = (
    roomCode: string
) => {

    return api.post(
        `/rooms/${roomCode}/presence/join`
    );
};

export const markRoomLeft = (
    roomCode: string
) => {

    return api.post(
        `/rooms/${roomCode}/presence/leave`
    );
};