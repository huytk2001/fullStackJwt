import React from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import {  fetchUserDetail, LoginUser, setUserDetails } from "../redux/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import LoginFrom from "../Form/loginForm";
import { fetchCartItems } from "../redux/Card/cardSlice";
import { handleAddress } from "../redux/addreessSlice";
Login.propTypes = {
  closeDialog: PropTypes.func,
};

function Login(props) {
  const negative = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar(); // Correctly initialize useSnackbar

  const handleSubmit = async (values) => {
    try {
      const action = LoginUser(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction); // Extract the result from the action
      console.log("New user", user);

      if (user) {
        enqueueSnackbar("Register successfully!!!", { variant: "success" });
        negative("/");
        const userDetails = await fetchUserDetail()
        dispatch(setUserDetails(userDetails))
        dispatch(fetchCartItems())
        dispatch(handleAddress())
      } else {
        enqueueSnackbar("Login successful but no user data returned (204).", {
          variant: "info",
        });
      }
    } catch (error) {
      console.log("Failed to register", error);
      enqueueSnackbar(error.message, { variant: "error" }); // Show error message
    }
  };

  return (
    <div>
      <LoginFrom onSubmit={handleSubmit} />
    </div>
  );
}

export default Login;
