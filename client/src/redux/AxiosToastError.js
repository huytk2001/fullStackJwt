import toast from "react-hot-toast"

const AxiosToastError = (error) => {
    toast.error(
        error && error.res && error.res.data ? error.res.data.message : "Unknown error"
    );

}
export default AxiosToastError