import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import productApi from "../../Api/productApi";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
function ListPageProducts() {
  const [products, setProduct] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productApi.getAll();
        console.log("Fetched products:", res.data); // Debug dữ liệu API
        setProduct(res.data.data);
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleOnClick = (id) => {
    console.log("Product ID:", id); // Debug giá trị ID
    navigate(`/product-details/${id}`);
  };

  return (
    <Box>
      <Container>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Danh sách sản phẩm
        </Typography>
        <Grid container spacing={2}>
          {products.length > 0 ? (
            products.map((product) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={product._id}
                onClick={() => handleOnClick(product._id)} // Đúng cách
                sx={{ cursor: "pointer" }} // Hiệu ứng trỏ chuột
              >
                <Paper elevation={3} sx={{ padding: 2 }}>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography>Price: {product.price} VND</Typography>
                  <Typography>Category: {product.category}</Typography>
                  <Typography>{product.description}</Typography>
                </Paper>
              </Grid>
            ))
          ) : (
            <Typography>No products found!</Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPageProducts;
