import React from "react";
import { useSelector } from "react-redux";
import { cardItemsSelector, cartTotalSelector } from "./selectors";
import { Box, Typography, Card, CardContent, Grid, Paper } from "@mui/material";
function CartFeature() {
  const cartTotal = useSelector(cartTotalSelector);

  const items = useSelector(cardItemsSelector);
  console.log(items);

  // console.log("Cart Total in Component:", cartTotal); // Debug trong component
  const calculateTotal = (quantity, price) => {
    return quantity * parseFloat(price);
  };
  
  return (
    <div>
      Total Cart Value: ${cartTotal}
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          🛒 Your Shopping Cart
        </Typography>

        <Paper sx={{ padding: 3 }}>
          {items.length > 0 ? (
            <Grid container spacing={2}>
              {items.map((item) => (
                <Grid item xs={12} md={6} key={item._id}>
                  <Card>
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
    </div>
  );
}

export default CartFeature;
