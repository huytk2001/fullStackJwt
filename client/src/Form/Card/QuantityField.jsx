import React from "react";
import PropTypes from "prop-types";
import { FormControl, FormHelperText, IconButton, OutlinedInput, Typography,Box } from "@mui/material";
import { Controller } from "react-hook-form";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";

QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  stock: PropTypes.number
};

function QuantityField({ form, label, name, disabled ,stock }) {
  const { error, setValue,watch  } = form;
  const value = watch(name) || 0;
  const handleIncrease = () => {
    if (value < stock) {
      
      setValue(name, Number(value) + 1)
    }
  
  };
  
  return (
  
      <FormControl fullWidth margin="normal" variant='outlined' size="small">
        <Typography> {label} </Typography>{" "}
        <Controller
          name={name}
          control={form.control}
          render={({field: { onChange, onBlur, value } }) => {
       return(     
       <Box
              sx={{
                maxWidth: "220px",
                display: "flex",
                flexFlow: "row nowrap",
                alignItems: "center",
                padding: (theme) => theme.spacing(1),
              }}
            >
              <IconButton
                onClick={() =>{
                 const newValue  = Number.parseInt(value)?1 :Number.parseInt(value)-1;
                 setValue(name,newValue )
                }}
              >
                <RemoveCircleOutline />
              </IconButton>{" "}
              <OutlinedInput id={name}  type="number"  disabled={value >= stock} value={value} onChange={onChange} onBlur={onBlur} />
              {/* <IconButton onClick={()=>{
                const newValue = value ? (Number.parseInt(value)+1) :1;
                setValue(name,newValue)
                
              }
              }>
                <AddCircleOutline />
              </IconButton> */}
                      <IconButton onClick={handleIncrease} disabled={value >= stock}>
          <AddCircleOutline />
        </IconButton>
            </Box>
            )
          }}
        ></Controller>
        <FormHelperText>{error}</FormHelperText>
      </FormControl>
   
  );
}

export default QuantityField;
