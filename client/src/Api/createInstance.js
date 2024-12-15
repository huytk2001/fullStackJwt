import axios from "axios";
import jwt_decode from "jwt-decode";
const refreshToken = async() => {
    try {
        const res = await axios.post("/v1/auth/refresh-token", {
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
const createAxios = (user, dispatch, stateSuccess) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(async(config) => {
        let date = new Date();
        const decodedToken = jwt_decode(user && user.accessToken);
        if (decodedToken.exp < date.getTime() / 1000) {
            const data = await refreshToken();
            const refreshUser = {
                ...user,
                accessToken: data.accessToken,
            };
            dispatch(stateSuccess(refreshUser));
            config.headers["Tokenn"] = "Bearer " + data.accessToken;
        }
        return config;
    });
};