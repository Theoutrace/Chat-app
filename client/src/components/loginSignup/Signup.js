import React, { useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import axios from "axios";
import "./Login.css";

const Signup = (props) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const nameTexthandler = (e) => {
    if (/\d/g.test(e.target.value)) {
      alert("digits are not allowed!");
    } else {
      setUserName(() => e.target.value);
    }
  };
  const emailTexthandler = (e) => {
    setUserEmail(() => e.target.value);
  };

  const phoneTexthandler = (e) => {
<<<<<<< HEAD
    if (/^\d*$/.test(e.target.value)) {
      setUserPhone(() => e.target.value);
    }
=======
    setUserPhone(() => e.target.value);
>>>>>>> fd28a6253a5cf9c52046e30f9144ae165a783588
  };

  const passwordTexthandler = (e) => {
    setUserPassword(() => e.target.value);
  };

  const onSignupHandler = async (event) => {
    event.preventDefault();
    const userObj = {
      name: userName,
      email: userEmail,
      phone: userPhone,
      password: userPassword,
    };
    console.log("Signup", userObj);

    const response = await axios.post(
      `https://crudcrud.com/api/4dc987fdb00d4b44bc3c5273fdd66f83/folder`,
      userObj,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log(response);
  };
  return (
    <form onSubmit={onSignupHandler}>
      <Card
        sx={{
          maxWidth: 345,
          minWidth: 300,
          maxHeight: 500,
<<<<<<< HEAD
          minHeight: 500,
=======
          minHeight: 450,
>>>>>>> fd28a6253a5cf9c52046e30f9144ae165a783588
        }}
        className="d-flex justify-content-center align-item-center"
      >
        <Box
          sx={{
            "& .MuiTextField-root": { mx: 4, my: 1, width: "30ch" },
          }}
          className="d-flex flex-column justify-content-center align-item-center"
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
            Signup
          </Typography>
          <TextField
            required
            id="outlined-required"
            label="Name"
            type="text"
            onChange={nameTexthandler}
            value={userName}
          />
          <TextField
            required
            id="outlined-required"
            label="Email"
            type="email"
            onChange={emailTexthandler}
            value={userEmail}
          />
          <TextField
            required
            id="outlined-required"
            label="Phone Number"
            type="phone"
            onChange={phoneTexthandler}
            value={userPhone}
          />
          <TextField
            id="outlined-password-input"
            required
            label="Password"
            type="password"
            autoComplete="new-password"
            onChange={passwordTexthandler}
            value={userPassword}
          />
          <Button
            variant="contained"
            sx={{ mx: 4, my: 1, width: "259px" }}
            type="submit"
          >
            Register
          </Button>
          <Typography variant="p" sx={{ mx: 4, my: 2, width: "259px" }}>
            Already have an account?
            <span
              className="cursor-pointer-login-signup mx-1 text-primary"
              onClick={() => props.toggle()}
            >
              Login
            </span>
          </Typography>
        </Box>
      </Card>
    </form>
  );
};

export default Signup;
