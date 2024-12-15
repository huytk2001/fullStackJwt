import React from "react";
import PropTypes from "prop-types";
import { Box, Skeleton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../../unils";

Product.propTypes = {
  product: PropTypes.object,
};

function Product({ product }) {
  const navigate = useNavigate();
  const cleanImages = product.images.map((image) =>
    // Xử lý các chuỗi có dấu nháy kép dư thừa
    image.includes('"') ? image.replace(/[\\"[\]]/g, "") : image
  );
  const handleClick = () => {
    if (product?.id) {
      navigate(`/products/${product.id}`);
    }
  };
  return (
    <Box padding={1} onClick={handleClick}>
      <Box padding={1} minHeight="215px">
        {product.length > 0 ? (
          <img width="100%" src={product.image[0]} alt={product.title} />
        ) : (
          <Skeleton variant="rectangular" width="100%" height={100} />
        )}
      </Box>

      <Typography variant="body2">{product.title}</Typography>
      <Typography variant="body2">
        <Box component="span" fontSize="16px" fontWeight="bold" marginRight={1}>
          {formatPrice(product.price)}
        </Box>
      </Typography>
    </Box>
  );
}
export default Product;
