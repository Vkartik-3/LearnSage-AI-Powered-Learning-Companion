import { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";

import Navbar from "../navbar/Navbar";

import { Button, FormControl, Typography } from "@mui/material";
import {
  TextField,
  Select,
  MenuItem,
  Card,
  InputLabel,
  Box,
} from "@mui/material";

import { Controller, useForm } from "react-hook-form";

import { NavLink } from "react-router-dom";

import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register(props) {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("http://localhost:8000/auth/register/", {
        email: data.email,
        password: data.pwd1,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNo: data.phoneno,
        role: data.role,
      })
      .then(function (response) {
        console.log(response);
        props.toast.success(response.data.message, { theme: "colored" });
        navigate("../login");
      })
      .catch(function (error) {
        console.log(error);
        props.toast.error(error.response.data.error, { theme: "colored" });
      });
 };

  return (
    <>
      {/* <Navbar /> */}
      <Card
        className="order-summary-background"
        sx={{
          width: { xs: "100vw", md: "50vw" },
          bgcolor: "#1c1c1c",
          margin: "auto",
          mt: 4,
          p: 4,
        }}
      >
        <Typography variant="h3" sx={{ mb: 1, color: "#ff6542" }}>
          Register
        </Typography>

        <Typography variant="h6" sx={{ color: "lightgray" }}>
          You must register to continue learning
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4} sx={{ pt: 3 }}>
            <Grid xs={12} md={6}>
              <Controller
                name={"firstName"}
                control={control}
                defaultValue=""
                rules={{
                  required: "This is a required field",
                  pattern: {
                    value: /^\S*$/,
                    message: "This field can not contain any spaces",
                  },
                }}
                render={({
                  field: { ref, onChange, value },
                  fieldState: { invalid, error },
                }) => (
                  <TextField
                    fullWidth
                    onChange={onChange}
                    value={value}
                    label={"First Name"}
                    inputRef={ref}
                    error={invalid}
                    color="warning"
                    variant="filled"
                    helperText={
                      errors.firstName ? errors.firstName.message : ""
                    }
                    inputProps={{
                      sx: {
                        color: "gray",
                        borderBottom: "1px solid lightgray",
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        color: "gray",
                      },
                    }}
                  />
                )}
              />
            </Grid>

            <Grid xs={12} md={6}>
              <Controller
                name={"lastName"}
                control={control}
                defaultValue=""
                rules={{
                  required: "This is a required field",
                  pattern: {
                    value: /^\S*$/,
                    message: "This field can not contain any spaces",
                  },
                }}
                render={({
                  field: { ref, onChange, value },
                  fieldState: { invalid, error },
                }) => (
                  <TextField
                    fullWidth
                    onChange={onChange}
                    value={value}
                    label={"Last Name"}
                    inputRef={ref}
                    error={invalid}
                    color="warning"
                    variant="filled"
                    helperText={errors.lastName ? errors.lastName.message : ""}
                    inputProps={{
                      sx: {
                        color: "gray",
                        borderBottom: "1px solid lightgray",
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        color: "gray",
                      },
                    }}
                  />
                )}
              />
            </Grid>

            <Grid xs={12} md={6}>
              <Controller
                name={"email"}
                control={control}
                defaultValue=""
                rules={{
                  required: "This is a required field",
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "The email address is invalid",
                  },
                }}
                render={({
                  field: { ref, onChange, value },
                  fieldState: { invalid, error },
                }) => (
                  <TextField
                    fullWidth
                    onChange={onChange}
                    value={value}
                    label={"Email Address"}
                    inputRef={ref}
                    error={invalid}
                    helperText={errors.email ? errors.email.message : ""}
                    color="warning"
                    variant="filled"
                    inputProps={{
                      sx: {
                        color: "gray",
                        borderBottom: "1px solid lightgray",
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        color: "gray",
                      },
                    }}
                  />
                )}
              />
            </Grid>

            <Grid xs={12} md={6}>
              <Controller
                name={"phoneno"}
                control={control}
                defaultValue=""
                rules={{
                  required: "This is a required field",
                  minLength: {
                    value: 10,
                    message: "The phone number is invalid",
                  },
                  maxLength: {
                    value: 13,
                    message: "The phone number is invalid",
                  },
                }}
                render={({
                  field: { ref, onChange, value },
                  fieldState: { invalid, error },
                }) => (
                  <TextField
                    fullWidth
                    onChange={onChange}
                    value={value}
                    label={"Phone No"}
                    inputRef={ref}
                    error={invalid}
                    helperText={errors.phoneno ? errors.phoneno.message : ""}
                    color="warning"
                    variant="filled"
                    inputProps={{
                      sx: {
                        color: "gray",
                        borderBottom: "1px solid lightgray",
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        color: "gray",
                      },
                    }}
                  />
                )}
              />
            </Grid>

            <Grid xs={12} md={6}>
              <Controller
                name={"pwd1"}
                control={control}
                defaultValue=""
                rules={{
                  required: "This is a required field",
                }}
                render={({
                  field: { ref, onChange, value },
                  fieldState: { invalid, error },
                }) => (
                  <TextField
                    fullWidth
                    onChange={onChange}
                    value={value}
                    label={"Password"}
                    inputRef={ref}
                    error={invalid}
                    type="password"
                    helperText={errors.pwd1 ? errors.pwd1.message : ""}
                    color="warning"
                    variant="filled"
                    inputProps={{
                      sx: {
                        color: "gray",
                        borderBottom: "1px solid lightgray",
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        color: "gray",
                      },
                    }}
                  />
                )}
              />
            </Grid>

            <Grid xs={12} md={6}>
              <Controller
                name={"pwd2"}
                control={control}
                defaultValue=""
                rules={{
                  required: "This is a required field",
                  validate: (val) => {
                    if (watch("pwd1") != val) {
                      return "Your passwords do no match";
                    }
                  },
                }}
                render={({
                  field: { ref, onChange, value },
                  fieldState: { invalid, error },
                }) => (
                  <TextField
                    fullWidth
                    onChange={onChange}
                    value={value}
                    label={"Confirm Password"}
                    inputRef={ref}
                    error={invalid}
                    type="password"
                    helperText={errors.pwd2 ? errors.pwd2.message : ""}
                    color="warning"
                    variant="filled"
                    inputProps={{
                      sx: {
                        color: "gray",
                        borderBottom: "1px solid lightgray",
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        color: "gray",
                      },
                    }}
                  />
                )}
              />
            </Grid>

            {/* <Grid xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Controller
                  defaultValue={10}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Age"
                    >
                      <MenuItem disabledvalue={10}>Ten</MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  )}
                  name="Select"
                  control={control}
                />
              </FormControl>
            </Grid> */}

            <Grid xs={12}>
              <Button
                color="warning"
                type="submit"
                variant="contained"
                sx={{ width: { xs: "100%", md: "20%" }, bgcolor: "#ff6542" }}
              >
                Submit
              </Button>
            </Grid>

            <Grid xs={12}>
              <Typography color="lightgray">
                Already have an account?{" "}
                <NavLink style={{ textDecoration: "none", color: "#f03126" }} to="../login">
                  Log in
                </NavLink>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Card>
    </>
  );
}

export default Register;
