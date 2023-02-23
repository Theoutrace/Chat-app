import React, { useState } from "react";
import Card from "@mui/material/Card";
import sendIcon from "./images/send.png";
import attachIcon from "./images/attach.png";
import axios from "axios";
import "./ChatInput.css";
import { useDispatch, useSelector } from "react-redux";
import { ChatActions } from "../../Store/reducers/chat-reducer";
import jwtDecode from "jwt-decode";
const ChatInput = () => {
  const dispatch = useDispatch();
  const selectedGroup = useSelector((state) => state.chat.selectedGroup);
  const groupChatsMessages = useSelector((state) => state.chat.groupChats);
  const [messageText, setMessageText] = useState("");
  const messageOnChangeHandler = (e) => {
    setMessageText(() => e.target.value);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const messageObj = {
      message: messageText,
      userId: jwtDecode(localStorage.getItem("token")).id,
      groupId: selectedGroup.id,
    };
    await axios.post(`http://localhost:3001/chat/message`, messageObj, {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });

    dispatch(
      ChatActions.addGroupChats([
        ...groupChatsMessages,
        {
          message: messageObj.message,
          senderId: messageObj.userId,
          groupId: messageObj.groupId,
          senderName: jwtDecode(localStorage.getItem("token")).name,
          createdAt: new Date(),
        },
      ])
    );
    setMessageText(() => "");
    dispatch(ChatActions.fetchMsg());
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
