import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import QuantityField from "./QuantityField";
import { Button } from "@mui/material";


AddToCardForm.propTypes = {
  onSubmit: PropTypes.func,
  stock:PropTypes.number,
  currentQuantityInCart:PropTypes.number
};

function AddToCardForm({ onSubmit = null,stock,currentQuantityInCart }) {
 const stockNumber = stock;
 const quantityLimit = stockNumber-currentQuantityInCart
 const [isDisabled,setIsDisabled] = useState(false)
 const schema = yup.object().shape({
  quantity: yup
    .number()
    .min(1, "Please enter at least one")
    .max(quantityLimit, `Max ${quantityLimit} items available in stock`)
    .required("This field is required")
    .typeError("Please enter a valid number"),
});

  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });
  
  const handleSubmit = async (data) => {
    console.log("Quantity received from form:", data.quantity);
  
    if (onSubmit) {
      await onSubmit({ quantity: data.quantity });
    }
  };
  useEffect(()=>{
    if(quantityLimit<= 0){
      setIsDisabled(true)
    }else{
      setIsDisabled(false)
    }
  },[quantityLimit])

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <QuantityField name="quantity" label="Quantity" form={form} stock={quantityLimit} />
      <Button
        sx={(theme) => ({
          margin: theme.spacing(3, 0, 2, 0),
        })}
        variant="contained"
        color="primary"
        type="submit"
        disabled={isDisabled}
        style={{ width: "250px" }}
      >
        {quantityLimit > 0 ? "Add to Cart": "Het Hang"}
      </Button>
    </form>
  );
}

export default AddToCardForm;
