import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Divider, Grid, Paper } from '@mui/material';
import { useGlobalContent } from '../component/provider/GlobalProvider';
import { useSelector } from 'react-redux';
import orderApi from '../Api/orderApi';
import AxiosToastError from '../redux/AxiosToastError';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { DisplayPriceInVND } from '../redux/util/DisplayPriceInRupees';

function CheckOutPage() {
    const { notDiscountTotalPrice, totalPrice, totalQty, fetchCartItem,fetchOrder } = useGlobalContent()
    const {openAddress,setOpenAddress}= useState(false)
    const addressList = useSelector(state=> state.address.addressList)
    const [selectAddress,setSelecAddress]= useState(0)
    const cartItemList = useSelector(state=>state.card.cartItems)
    const navigate = useNavigate()
   const handleCashOnDelivery = async()=>{
    try {
        const response = await orderApi.CashOnDeliveryOrder({
            list_items : cartItemList,
            addressId : addressList[selectAddress]?._id,
            subTotalAmt : totalPrice,
            totalAmt :  totalPrice,
        })
        const {data:ResponseData} = response
        if(ResponseData.success){
            toast.success(ResponseData.message)
            if(fetchCartItem){
                fetchCartItem()
            }
            if(fetchOrder){
                fetchOrder()
            }
            navigate('/success',{
                state:{
                    text:"Order"
                }
            })
            
        }
    } catch (error) {
        AxiosToastError(error)
    }
   }
const handleOnlinePayment = async()=>{
    try {
        toast.loading("Loading ....")
            const stripePublickey = import.meta.env.VITE_STRIPE_PUBLIC_KEY
            const stripePromise = await loadStripe(stripePublickey)
            const response = await orderApi.payment_url({
                list_items : cartItemList,
                addressId : addressList[selectAddress]?._id,
                subTotalAmt : totalPrice,
                totalAmt :  totalPrice,
            })
            console.log('cartItemList:', cartItemList);
        console.log('selectAddress:', selectAddress);
        console.log('totalPrice:', totalPrice);
        console.log('addressId:', addressList[selectAddress]?._id);
            const{data:responseData} = response
            stripePromise.redirectToCheckout({sessionId:responseData.id})
            if(fetchCartItem){
                fetchCartItem()
            }
            if(fetchOrder){
                fetchOrder()
            }
        } catch (error) {
        AxiosToastError(error)
    }
}



    return (
        <Box sx={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            {/* Tiêu đề */}
            <Typography variant="h4" component="h1" gutterBottom>
                Checkout
            </Typography>

            {/* Thông tin giao hàng */}
            {/* <Paper elevation={3} sx={{ padding: '1.5rem', marginBottom: '2rem' }}>
               
                <Typography variant="h6" gutterBottom>
                    Shipping Information
                </Typography>
                <Grid container spacing={2}>
                  {
                    addressList.map((address,index)=>{
                        return(
                         <TextField></TextField>
                        )
                    })
                  }
                </Grid>
            </Paper> */}
<div className='bg-white p-2 grid gap-4'>
            {
              addressList.map((address, index) => {
                return (
                  <label htmlFor={"address" + index} className={!address.status && "hidden"}>
                    <div className='border rounded p-3 flex gap-3 hover:bg-blue-50'>
                      <div>
                        <input id={"address" + index} type='radio' value={index} onChange={(e) => setSelectAddress(e.target.value)} name='address' />
                      </div>
                      <div>
                        <p>{address.address_line}</p>
                        <p>{address.city}</p>
                        <p>{address.state}</p>
                        <p>{address.country} - {address.pincode}</p>
                        <p>{address.mobile}</p>
                      </div>
                    </div>
                  </label>
                )
              })
            }
            <div onClick={() => setOpenAddress(true)} className='h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer'>
              Add address
            </div>
          </div>
            {/* Tóm tắt đơn hàng */}
            <Paper elevation={3} sx={{ padding: '1.5rem', marginBottom: '2rem' }}>
                <Typography variant="h6" gutterBottom>
                    Order Summary
                </Typography>
                <Divider sx={{ marginY: '1rem' }} />
                <Box>
                    <Typography>{DisplayPriceInVND(notDiscountTotalPrice)}</Typography>
                    <Typography>{DisplayPriceInVND(totalPrice)}</Typography>
                 
                </Box>
                <Typography>Quantity Total</Typography>
                <Box>
                    <Typography>{totalQty} items</Typography>
                </Box>
                
                <Divider sx={{ marginY: '1rem' }} />
                <Typography variant="h6">Grand total: {DisplayPriceInVND(totalPrice)}</Typography>
            </Paper>

            {/* Thanh toán */}
            <Box textAlign="center">
                <Button onClick={handleOnlinePayment} variant="contained" color="primary" size="large">
                Online Payment
                </Button>
                <Button onClick={handleCashOnDelivery} variant="contained" color="primary" size="large">
                Cash on Delivery
                </Button>
            </Box>
        
        </Box>
    );
}

export default CheckOutPage;
