import { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

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
import { createTheme } from '@mui/material/styles';


import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { color } from "framer-motion";
function Login(props) {

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const navigate = useNavigate();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
    watch,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("http://localhost:8000/auth/login/", {
        email: data.email,
        password: data.pwd1,
        role: data.role,
      })
      .then(function (response) {
        console.log(response.data.token);
        localStorage.setItem(
          "userdata",
          JSON.stringify({ jwt: response.data.token, id: response.data.id })
        );
        props.toast.success(response.data.message, { theme: "colored" });
        navigate("../subject/");
      })
      .catch(function (error) {
        console.log(error);
        props.toast.error(error.response.data.error, { theme: "colored" });
      });
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        {/* Your component JSX */}
      </ThemeProvider>

      {/* <Navbar /> */}
      <Card
        sx={{
          width: { xs: "60vw", md: "30vw" },
          bgcolor: "#1c1c1c",
          margin: "auto",
          mt: 4,
          p: 4,
        }}
      >
        <Typography variant="h3" sx={{ mb: 1, color: "#ff6542" }}>
          Login
        </Typography>

        <Typography variant="h6" sx={{ color: "lightgray" }}>
          You must log in to continue learning
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4} sx={{ pt: 3 }}>
            <Grid xs={12}>
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
                    variant="filled"
                    color= "warning"
                    helperText={errors.email ? errors.email.message : ""}
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

            <Grid xs={12}>
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
                    
                    helperText={errors.pwd1 ? errors.pwd1.message : ""}
                  />
                )}
              />
            </Grid>

            <Grid xs={12}>
              <Button
                type="submit"
                color="warning"
                variant="contained"
                sx={{ width: { xs: "100%", md: "30%" }, bgcolor: "#ff6542"}}
              >
                Submit
              </Button>
            </Grid>

            <Grid xs={12}>
              <Typography color="lightgray">
                Havent created an account yet?{" "}
                <NavLink style={{ textDecoration: "none" , color: "#f03126"}} to="../register">
                  Register
                </NavLink>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Card>
    </>
  );
}

export default Login;
