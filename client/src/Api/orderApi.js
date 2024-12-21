import axiosClient from "./axiosClient"

const orderApi = {
    getOrder(params) {
        const url = `/api/order/order-list`
        return axiosClient.get(url, { params })
    },
    CashOnDeliveryOrder(data) {
        const url = `/api/order/cash-on-delivery`
        return axiosClient.post(url, data)
    },
    payment_url(data) {
        const url = `/api/order/checkout`
        return axiosClient.post(url, data)
    }
}
export default orderApi