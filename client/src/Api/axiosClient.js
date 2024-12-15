import axios from "axios";
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
// Refresh Token Function
// const refreshToken = async () => {
//   try {
//     console.log("Attempting to refresh token...");
//     const res = await axios.post("/v1/auth/refresh", { withCredentials: true });
//     console.log("New access token received:", res.data.accessToken);
//     return res.data; // { accessToken: ..., refreshToken: ... }
//   } catch (err) {
//     console.error("Failed to refresh token:", err.message);
//     return null;
//   }
// };

// axiosClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken"); // Consistent key retrieval
        console.log("Retrieved Token:", token);

        if (token) {
            console.log("Current Token:", token);
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        console.error("Request error:", error.message);
        return Promise.reject(error);
    }
);

// Response Interceptor to handle API responses and errors
// axiosClient.interceptors.response.use(
//   (response) => {
//     if (response.status === 204) {
//       return null;
//     }
//     return response.data;
//   },
//   (error) => {
//     if (error.response) {
//       const { config, status, data } = error.response;

//       console.error("Response error status:", status);
//       console.error("URL:", config.url);
//       console.error("Error data:", data);

//       const URLS = ["/auth/login/", "/users"];

//       if (URLS.includes(config.url) && status === 400) {
//         const errorList = data.data || [data];
//         const firstError = errorList.length > 0 ? errorList[0] : {};
//         const messageList = firstError.messages || [];
//         const firstMessage = messageList.length > 0 ? messageList[0] : {};
//         console.error("Server error message:", firstMessage.message);

//         throw new Error(firstMessage.message || "An error occurred.");
//       }
//     }

//     console.error("Other errors:", error.message);
//     return Promise.reject(error);
//   }
// );
axios.interceptors.request.use(
    (response) => {
        return response;
    },
    async(error) => {
        let originRequest = error.config;

        if (error.response.status === 401 && !originRequest.retry) {
            originRequest.retry = true;

            const refreshToken = localStorage.getItem("refreshToken");

            if (refreshToken) {
                const newAccessToken = await refreshAccessToken(refreshToken);

                if (newAccessToken) {
                    originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axiosClient(originRequest);
                }
            }
        }

        return Promise.reject(error);
    }
);
// axiosClient.interceptors.response.use(
//   (response) => {
//     // Xử lý phản hồi có nội dung
//     if (response.status === 204) {
//       // Nếu API trả về 204, có thể trả về null hoặc thông báo mặc định
//       return null;
//     }
//     return response.data; // Trả về dữ liệu gọn gàng
//   },
//   (error) => {
//     if (error.response) {
//       const { config, status, data } = error.response;
//       // Ví dụ xử lý lỗi 400 cho các URL cụ thể
//       const URLS = ["/auth/login/", "/users"];
//       if (URLS.includes(config.url) && status === 400) {
//         const errorList = data.data || [data];
//         const firstError = errorList.length > 0 ? errorList[0] : {};
//         const messageList = firstError.messages || [];
//         const firstMessage = messageList.length > 0 ? messageList[0] : {};
//         throw new Error(firstMessage.message || "Đã xảy ra lỗi.");
//       }
//     }
//     // Xử lý lỗi khác
//     return Promise.reject(error);
//   }
// );
export default axiosClient;