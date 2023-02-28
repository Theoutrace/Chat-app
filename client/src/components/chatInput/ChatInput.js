import React, { useState, useEffect } from "react";
import attachIcon from "./images/attach.png";
import { useDispatch, useSelector } from "react-redux";
import sendIcon from "./images/send.png";
import Card from "@mui/material/Card";
import jwtDecode from "jwt-decode";
import axios from "axios";
import "./ChatInput.css";
import { ChatActions } from "../../Store/reducers/chat-reducer";

const ChatInput = (props) => {
  const dispatch = useDispatch();
  const selectedGroup = useSelector((state) => state.chat.selectedGroup);
  const AllChats = useSelector((state) => state.chat.AllChats);
  const [messageText, setMessageText] = useState("");
  const userDetails = jwtDecode(localStorage.getItem("token"));

  const messageOnChangeHandler = (e) => {
    setMessageText(() => e.target.value);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const messageObj = {
      message: messageText,
      userId: userDetails.id,
      groupId: selectedGroup.id,
    };
    await axios.post(`http://localhost:3001/chat/message`, messageObj, {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });

    const messageDetails = {
      createdAt: new Date().getTime().toString(),
      groupId: selectedGroup.id,
      message: messageText,
      senderId: userDetails.id,
      senderName: userDetails.name,
    };

    props.socket.emit("send-message", messageDetails);

    dispatch(ChatActions.addToAllChat([...AllChats, messageDetails]));
    setMessageText(() => "");
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
        padding: "20px",
        borderRadius: "0px 0px 10px 10px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        position: "absolute",
        left: "0",
        bottom: "0",
        zIndex: "2",
      }}
    >
      <div className="col-sm-1 d-flex justify-content-center m-1 additional-send-attach-cls p-1">
        <img src={attachIcon} alt="attach items" width="35px" />
      </div>
      <input
        className="col-sm-10  input-bx-cls-add"
        placeholder="start typing..."
        onChange={messageOnChangeHandler}
        value={messageText}
        sx={{ width: { sm: "80%" } }}
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
