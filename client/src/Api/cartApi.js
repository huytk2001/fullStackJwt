import axiosClient from "./axiosClient";

const CartApi = {
    create(data) {
        const url = `/api/cart/create`;
        return axiosClient.post(url, data)
    },
    get(params) {
        const url = `/api/cart/get`;
        return axiosClient.get(url, { params })
    }
}
export default CartApi