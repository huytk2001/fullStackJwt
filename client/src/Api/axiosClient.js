import axios, { Axios } from "axios";
// import { jwtDecode } from "jwt-decode";

// Create Axios client
const axiosClient = axios.create({
    baseURL: "http://localhost:4000",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});
const refreshAccessToken = async(refreshToken) => {
    try {
        const response = await axiosClient({
            url: "http://localhost:4000/v1/auth/refresh-token",
            method: "post",
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        });

        const accessToken = response.data.data.accessToken;

        localStorage.setItem("accessToken", accessToken);
        return accessToken;
    } catch (error) {
        console.log(error);
    }
};

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken"); // Consistent key retrieval

        if (token) {

            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        console.error("Request error:", error.message);
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => {

        return response;
    },
    async(error) => {
        console.error("Response error:", error.message);
        let originRequest = error.config;

        if (
            error.response &&
            error.response.status === 401 &&
            !originRequest.retry
        ) {


            originRequest.retry = true;

            const refreshToken = localStorage.getItem("refreshToken");


            if (refreshToken) {
                try {
                    const newAccessToken = await refreshAccessToken(refreshToken);


                    if (newAccessToken) {
                        originRequest.headers.Authorization = `Bearer ${newAccessToken}`;


                        return axios(originRequest); // Retry request
                    }
                } catch (refreshErr) {
                    console.error("Failed to refresh token:", refreshErr.message);
                }
            }
        }

        return Promise.reject(error);
    }
);

export default axiosClient;