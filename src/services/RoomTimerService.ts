import api from "../api/axios";

export const getRoomTimer = (
    roomCode: string
) => {

    return api.get(
        `/rooms/${roomCode}/timer`
    );
};