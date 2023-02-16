import React from "react";
import Card from "@mui/material/Card";
import sendIcon from "./images/send.png";
import attachIcon from "./images/attach.png";
import "./ChatInput.css";
const ChatInput = () => {
  return (
    <div className="col-sm-12 add-cls-inp-bx-outer">
      <Card
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60px",
          padding: "10px",
        }}
      >
        <div className="col-sm-1 d-flex justify-content-center m-1 additional-send-attach-cls p-1">
          <img src={attachIcon} alt="attach items" width="35px" />
        </div>
        <input
          className="col-sm-10  input-bx-cls-add"
          placeholder="start typing..."
        />
        <div className="col-sm-1 m-1 additional-send-attach-cls p-1">
          <img src={sendIcon} alt="send" width="35px" />
        </div>
      </Card>
    </div>
  );
};

export default ChatInput;
