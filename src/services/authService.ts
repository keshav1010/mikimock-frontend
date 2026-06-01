import api from "../api/axios";

export const loginUser = async (
    email: string,
    password: string
) => {

    const response = await api.post(
        "/auth/login",
        {
            email,
            password
        }
    );

    return response.data;
};

export const getMe = async () => {

    const response = await api.get(
        "/users/me"
    );

    return response.data;
};