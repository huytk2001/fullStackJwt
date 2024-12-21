import { createContext, useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { cardItemsSelector } from "../../redux/Card/selectors";
import CartApi from "../../Api/cartApi";
import { addToCard, addToCardProduct } from "../../redux/Card/cardSlice";
import AxiosToastError from "../../redux/AxiosToastError";
import toast from "react-hot-toast";
import { PriceWithDiscount } from "../../redux/util/PriceWithDiscount";
import addressApi from "../../Api/addressApi";
import orderApi from "../../Api/orderApi";
import { setOrder } from "../../redux/orderSlice";

 export const GlobalContent = createContext(null);
 export const useGlobalContent = ()=> useContext(GlobalContent)
 
 const GlobalProvider = ({children})=>{
    const dispatch = useDispatch()
    const [totalPrice,setTotalPrice] = useState(0)
    const [notDiscountTotalPrice,setNotDiscountTotalPrice]= useState(0)
    const [totalQty,setTotalQty] = useState(0)
    const cartItem = useSelector(cardItemsSelector)
    const user = useSelector(state=> state.user)
    const fetchCartItem = async()=>{
        try {
            const response = await CartApi.get()
            const {data: responseData}= response
            if(responseData.success){
                dispatch(addToCard(responseData.data))
                console.log(responseData);
                
            }
        } catch (error) {
            console.log(error);
            AxiosToastError(error)
            return error
        }
    }
    const updatedCartItem = async(id,qty)=>{
        try {
            const response = await CartApi.update({_id:id,qty:qty})
            const {data: ResponseData} = response
            if(ResponseData.success){
                fetchCartItem()
                return ResponseData
            }
        } catch (error) {
            console.log(error);
            AxiosToastError(error)
            return error
        }
    }
    const deleteCartItem = async(cartId)=>{
        try {
            const response = await CartApi.delete({_id:cartId})
            const {data: responseData} = response
            if(responseData.success){
                toast.success(responseData.message)
                fetchCartItem()
            }
        } catch (error) {
            console.log(error);
            AxiosToastError(error)
            return error
        }
    }
    useEffect(()=>{
        const qty = cartItem.reduce((preve,curr)=>{
            return preve + curr.quantity
        },0)
        setTotalQty(qty)
        const tprice = cartItem.reduce((preve,curr)=>{
            const priceAfterDiscount = PriceWithDiscount(curr.productId.price,curr.productId.discount)
            return preve +(priceAfterDiscount * curr.quantity)
        },0)
        setTotalPrice(tprice)

        const notDiscountPrice = cartItem.reduce((preve,curr)=>{
            return preve+ (curr.productId.price*curr.quantity)
        })
        setNotDiscountTotalPrice(notDiscountPrice)
    },[cartItem]
)
const fetchAddress = async()=>{
    try {
        const response = await addressApi.getAddress()
        if(response.success){
            dispatch(addToCard(response.data))
        }
    } catch (error) {
        console.log(error);
        AxiosToastError(error)
        return error
    }
}
const fetchOrder = async()=>{
    try {
        const response = await orderApi.getOrder()
        if(response.success){
            dispatch(setOrder(response.data))
        }
    } catch (error) {
        console.log(error);
        AxiosToastError(error)
        return error
    }
}
useEffect(()=>{
    fetchCartItem()
    fetchAddress()
    fetchOrder()
},[user])
    return(<GlobalContent.Provider value={{
        fetchCartItem,updatedCartItem,deleteCartItem,fetchAddress,notDiscountTotalPrice
    }}>{children}</GlobalContent.Provider>)
 }
 export default GlobalProvider