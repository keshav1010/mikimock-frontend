import api from "../api/axios";

export const joinInterview =
    async () => {

    const response =
        await api.post(
            "/practice/join"
        );

    return response.data;
};