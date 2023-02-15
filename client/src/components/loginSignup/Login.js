import React, { useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import axios from "axios";
import "./Login.css";

const Login = (props) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const emailInputHandler = (e) => {
    setUserEmail(() => e.target.value);
  };

  const passwordInputHandler = (e) => {
    setUserPassword(() => e.target.value);
  };

  const loginFormSubmitHandler = async (e) => {
    e.preventDefault();
    const userObj = {
      email: userEmail,
      password: userPassword,
    };

    try {
      const response = await axios.post(
        `http://localhost:3001/login`,
        userObj,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
      } else {
        throw new Error(response.response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
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
          <TextField
            required
            id="outlined-required"
            label="Email"
            onChange={emailInputHandler}
            value={userEmail}
          />
          <TextField
            id="outlined-password-input"
            required
            label="Password"
            type="password"
            onChange={passwordInputHandler}
            value={userPassword}
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
