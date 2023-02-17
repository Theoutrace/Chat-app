import React, { useState } from "react";
import Card from "@mui/material/Card";
import sendIcon from "./images/send.png";
import attachIcon from "./images/attach.png";
import axios from "axios";
import "./ChatInput.css";
const ChatInput = () => {
  const [messageText, setMessageText] = useState("");
  const messageOnChangeHandler = (e) => {
    console.log(e.target.value);
    setMessageText(() => e.target.value);
  };

  const auth = localStorage.getItem("token");

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("submitted");
    const messageObj = {
      message: messageText,
    };
    const response = await axios.post(
      `http://localhost:3001/chat/message`,
      messageObj,
      {
        headers: { Authorization: auth, "Content-Type": "application/json" },
      }
    );

    console.log(response);
  };
  return (
    <Card
      component="form"
      onSubmit={formSubmitHandler}
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60px",
        padding: "10px",
        borderRadius: "0px 0px 10px 10px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",

        position: "absolute",
        left: "0",
        bottom: "0",
        zIndex: "2",
      }}
      className={{ xs: "col-sm-12", md: "col-sm-9" }}
    >
      <div className="col-sm-1 d-flex justify-content-center m-1 additional-send-attach-cls p-1">
        <img src={attachIcon} alt="attach items" width="35px" />
      </div>
      <input
        className="col-sm-10  input-bx-cls-add"
        placeholder="start typing..."
        onChange={messageOnChangeHandler}
        value={messageText}
      />
      <button
        className="col-sm-1 m-1 additional-send-attach-cls p-1"
        type="submit"
      >
        <img src={sendIcon} alt="send" width="35px" />
      </button>
    </Card>
  );
};

export default ChatInput;
