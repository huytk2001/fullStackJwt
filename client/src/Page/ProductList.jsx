import React from "react";
import PropTypes from "prop-types";
import { Box, Grid } from "@mui/material";
import Product from "../component/ProductDetails/Product";

ProductList.propTypes = {
  data: PropTypes.array,
};

function ProductList({ data = [] }) {
  // Sử dụng giá trị mặc định
  return (
    <Box>
      <Grid container spacing={2}>
        {data.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            {/* <Box padding={1}>
              <Skeleton variant="rectangular" width="100%" height={118} />
              <Skeleton />
              <Skeleton width="60%" />
            </Box> */}
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductList;
