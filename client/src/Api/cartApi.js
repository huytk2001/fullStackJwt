import axiosClient from "./axiosClient";

const CartApi = {
    create(data) {
        const url = `/api/cart/create`;
        return axiosClient.post(url, data)
    },
    get(params) {
        const url = `/api/cart/get`;
        return axiosClient.get(url, { params })
    },
    update(data) {
        const url = `/api/cart/update-qty`;
        return axiosClient.put(url, data)
    },
    delete(data) {
        const url = '/api/cart/delete-cart-item';
        return axiosClient.delete(url, data)
    }
}
export default CartApi