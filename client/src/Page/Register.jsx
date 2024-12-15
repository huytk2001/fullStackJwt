import React from "react";
import PropTypes from "prop-types";
import RegisterForm from "../Form/registerForm";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { registerUser } from "../redux/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

Register.propTypes = {
  closeDialog: PropTypes.func,
};

function Register(props) {
  const negative = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar(); // Correctly initialize useSnackbar

  const handleSubmit = async (values) => {
    try {
      const action = registerUser(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction); // Extract the result from the action
      console.log("New user", user);

      // Check if closeDialog is passed as a prop and close the dialog if it exists
      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }

      // Show success message
      enqueueSnackbar("Register successfully!!!", { variant: "success" });
      negative("/login");
    } catch (error) {
      console.log("Failed to register", error);
      enqueueSnackbar(error.message, { variant: "error" }); // Show error message
    }
  };

  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
