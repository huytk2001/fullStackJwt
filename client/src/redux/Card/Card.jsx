import React from "react";
import { useSelector } from "react-redux";
import { cardItemsSelector, cartTotalSelector } from "./selectors";
import { Box, Typography, Card, CardContent, Grid, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
function CartFeature() {
  const cartTotal = useSelector(cartTotalSelector);
  const user = useSelector(state=>state.user)
  console.log("user",user);
  
  const items = useSelector(cardItemsSelector);

  const navigate = useNavigate()
  const handleOnclick = (id)=>{
    navigate(`/product-details/${id}`)
  }
  // console.log("Cart Total in Component:", cartTotal); // Debug trong component
  const calculateTotal = (quantity, price) => {
    return quantity * parseFloat(price);
  };
  const CheckOut =()=>{
    if(user&&user._id){
      navigate('/checkout')
      if(close){
        close()
      }
    }
  }
  
  return (
    <div>
     
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          🛒 Your Shopping Cart
        </Typography>

        <Paper sx={{ padding: 3 }}>
          {items.length > 0 ? (
            <Grid container spacing={2}>
              {items.map((item) => (
                <Grid item xs={12} md={6} key={item._id}>
                  <Card onClick={()=> handleOnclick(item.productId)} sx={{cursor:'pointer'}}>
                    <CardContent>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography>Price: ${item.price}</Typography>
                      <Typography>Quantity: {item.quantity}</Typography>
                      <Typography>
                        Total: $
                        {calculateTotal(item.quantity, item.price)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography sx={{ textAlign: "center", color: "grey.600" }}>
              Your cart is currently empty.
            </Typography>
          )}
        </Paper>
      </Box>
      {
        items.length>0 &&(
          <Box>
            <Typography>Total Cart Value: ${cartTotal}</Typography>
            <Button onClick={CheckOut}>
              Proceed
            </Button>
          </Box>
        )
      }
    </div>
  );
}

export default CartFeature;
