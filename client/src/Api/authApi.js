import { logout } from "../redux/userSlice";
import axiosClient from "./axiosClient";
const userApi = {
  register(data) {
    const url = `/v1/auth/register`;
    return axiosClient.post(url, data);
  },
  login(data) {
    const url = `/v1/auth/login`;
    return axiosClient.post(url, data);
  },
  logout() {
    const url = `/v1/auth/logout`;
    return axiosClient.post(url);
  },
};
export default userApi;
