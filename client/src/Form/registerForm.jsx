import React from "react";
import PropTypes from "prop-types";
import { Avatar, Button, LinearProgress, Typography } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { deepOrange } from "@mui/material/colors";
import InputField from "./Input/inputField";
import * as yup from "yup";
RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

function RegisterForm({ onSubmit }) {
  const schema = yup.object().shape({
    username: yup
      .string()
      .required()
      .test(
        "Should has at least",
        "please enter at least two words",
        (value) => {
          return value.split(" ").length >= 2;
        }
      ),
    email: yup.string().required(),
    password: yup.string().required().min(6, "please enter at laset six chars"),
    retypePassword: yup.string().required(),
  });
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      retypePassword: "",
    },
    resolver: yupResolver(schema),
  });
  const { isSubmitting } = form.formState;
  const handleSubmit = async (values) => {
    console.log("Todo form values:", values);
    if (onSubmit) {
      await onSubmit(values);
    }
  };
  return (
    <>
      <div sx={{ flexGrow: 2, position: "relative" }}>
        {isSubmitting && (
          <LinearProgress
            sx={(theme) => ({
              position: "absolute",
              top: theme.spacing(1),
              left: 0,
              right: 0,
            })}
          />
        )}
        {/* <LinearProgress /> */}
        <Avatar sx={{ margin: "0 auto" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h3" sx={{ textAlign: "center" }}>
          Create An Account
        </Typography>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <InputField name="username" label="full name" form={form} />
          <InputField name="email" label="Email" form={form} />
          <InputField name="password" label="Password" form={form} />
          <InputField
            name="retypePassword"
            label="Retype Password"
            form={form}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            disabled={isSubmitting}
          >
            Create an account
          </Button>
        </form>
      </div>
    </>
  );
}

export default RegisterForm;
