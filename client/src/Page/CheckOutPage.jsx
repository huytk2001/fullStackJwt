import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Divider, Grid, Paper } from '@mui/material';
import { useGlobalContent } from '../component/provider/GlobalProvider';

function CheckOutPage() {
    const { notDiscountTotalPrice, totalPrice, totalQty, fetchCartItem,fetchOrder } = useGlobalContent()
    const {openAddress,setOpenAddress}= useState(false)

    return (
        <Box sx={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            {/* Tiêu đề */}
            <Typography variant="h4" component="h1" gutterBottom>
                Checkout
            </Typography>

            {/* Thông tin giao hàng */}
            <Paper elevation={3} sx={{ padding: '1.5rem', marginBottom: '2rem' }}>
                <Typography variant="h6" gutterBottom>
                    Shipping Information
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Full Name" variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Email Address" variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Phone Number" variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Shipping Address" variant="outlined" />
                    </Grid>
                </Grid>
            </Paper>

            {/* Tóm tắt đơn hàng */}
            <Paper elevation={3} sx={{ padding: '1.5rem', marginBottom: '2rem' }}>
                <Typography variant="h6" gutterBottom>
                    Order Summary
                </Typography>
                <Divider sx={{ marginY: '1rem' }} />
                <Box>
                    <Typography>Product 1: $50</Typography>
                    <Typography>Product 2: $30</Typography>
                    <Typography>Product 3: $20</Typography>
                </Box>
                <Divider sx={{ marginY: '1rem' }} />
                <Typography variant="h6">Total: $100</Typography>
            </Paper>

            {/* Thanh toán */}
            <Box textAlign="center">
                <Button variant="contained" color="primary" size="large">
                    Confirm and Pay
                </Button>
            </Box>
        </Box>
    );
}

export default CheckOutPage;
