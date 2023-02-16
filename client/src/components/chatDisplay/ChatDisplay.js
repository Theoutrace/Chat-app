import { Card } from "@mui/material";
import React from "react";
import ChatInput from "../chatInput/ChatInput";
import "./ChatDisplay.css";

const ChatDisplay = () => {
  return (
    <div className="col-sm-9">
      <Card
        sx={{ height: "100%", backgroundColor: "none", borderRadius: "10px" }}
      >
        <div className="col-sm-12 bg-primary container message-box-cntnr-disp">
          <ChatInput />
        </div>
      </Card>
    </div>
  );
};

export default ChatDisplay;
