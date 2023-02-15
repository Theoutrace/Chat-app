import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import "./Login.css";

const Login = (props) => {
  const loginFormSubmitHandler = (e) => {
    e.preventDefault();
    console.log("prevented");
  };
  return (
    <form onSubmit={loginFormSubmitHandler}>
      <Card
        sx={{
          maxWidth: 350,
          minWidth: 350,
          maxHeight: 400,
          minHeight: 400,
        }}
        className="d-flex justify-content-center align-item-center "
      >
        <Box
          sx={{
            "& .MuiTextField-root": { mx: 4, my: 1, width: "30ch" },
          }}
          className="d-flex flex-column justify-content-center align-item-center"
          autoComplete="on"
        >
          <Typography
            variant="h5"
            sx={{
              mx: 4,
              my: 3,
              width: "259px",
              textAlign: "center",
            }}
          >
            Login
          </Typography>
          <TextField required id="outlined-required" label="Email" />
          <TextField
            id="outlined-password-input"
            required
            label="Password"
            type="password"
          />
          <Typography variant="p" sx={{ mx: 4, mb: 1, width: "259px" }}>
            <span
              className="cursor-pointer-login-signup mx-1 text-primary"
              onClick={() => ""}
            >
              Forgot Password
            </span>
          </Typography>
          <Button
            variant="contained"
            type="submit"
            sx={{ mx: 4, my: 1, width: "259px" }}
          >
            Login
          </Button>
          <Typography variant="p" sx={{ mx: 4, my: 2, width: "259px" }}>
            Don't have an account?
            <span
              className="cursor-pointer-login-signup mx-1 text-primary"
              onClick={() => props.toggle()}
            >
              Register
            </span>
          </Typography>
        </Box>
      </Card>
    </form>
  );
};

export default Login;
