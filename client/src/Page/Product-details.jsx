import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Grid, Avatar } from "@mui/material";
import { useParams } from "react-router-dom";
import productApi from "../Api/productApi";

const ProductDetails = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [product, setProduct] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await productApi.getId(id);
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    };
    fetchProductDetails();
  }, [id]);

  if (!product) {
    return (
      <Typography variant="h5" sx={{ mt: 5, textAlign: "center" }}>
        Loading product details...
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {product.name}
        </Typography>

        <Grid container spacing={3}>
          {/* Hiển thị hình ảnh sản phẩm */}
          <Grid item xs={12} md={6}>
            <Avatar
              src={product.image[0]}
              alt={product.name}
              sx={{ width: 300, height: 300 }}
            />
          </Grid>

          {/* Hiển thị thông tin chi tiết */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" fontWeight="bold">
              Price: {product.price} VND
            </Typography>
            <Typography>Category ID: {product.category}</Typography>
            <Typography sx={{ mt: 2 }}>{product.description}</Typography>

            <Box sx={{ mt: 3 }}>
              <Typography fontWeight="bold">More Details</Typography>
              <Typography>Origin: {product.more_details.origin}</Typography>
              <Typography>Weight: {product.more_details.weight}</Typography>
              <Typography>
                Expiry Date: {product.more_details.expiry_date}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProductDetails;
