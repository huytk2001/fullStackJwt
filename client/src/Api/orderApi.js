import axiosClient from "./axiosClient"

const orderApi = {
    getOrder(params) {
        const url = `/api/order/order-list`
        return axiosClient.get(url, { params })
    }
}
export default orderApi