import axiosClient from "./axiosClient"

const addressApi = {
    getAddress(params) {
        const url = `/api/address/get`
        return axiosClient.get(url, { params })
    }
}
export default addressApi