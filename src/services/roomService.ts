import api from "../api/axios";

export const getRoomToken =
    async (
        roomCode: string
    ) => {

    const response =
        await api.post(
            `/room/${roomCode}/token`
        );

    return response.data.data;
};