import axios from "axios";

const api = axios.create({

    baseURL:
        import.meta.env.VITE_API_BASE_URL,

    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use((config) => {

    const token =
        localStorage.getItem(
            "accessToken"
        );

    // DON'T SEND TOKEN
    // FOR LOGIN API
    console.log(
        "API URL:",
        config.baseURL,
        config.url
    );

    console.log(
        "Token exists:",
        !!token
    );

    const isLoginRequest =
        config.url?.includes(
            "/auth/login"
        )

    


    if (
        token &&
        !isLoginRequest
    ) {

        config.headers.Authorization =
            `Bearer ${token}`;
    }

    return config;
});

export default api;