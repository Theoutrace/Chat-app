import { Card } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import ChatDisplayHeader from "../chatDisplayUser/ChatDisplayHeader";
import ChatInput from "../chatInput/ChatInput";
import jwtDecode from "jwt-decode";
import "./ChatDisplay.css";

const ChatDisplay = () => {
  const chatMsgs = useSelector((state) => state.chat.chat);
  const auth = localStorage.getItem("token");
  const userObj = jwtDecode(auth);
  const userId = userObj.id;
  // console.log(userId);
  return (
    <Card
      sx={{
        height: "100%",
        width: { xs: "100%", md: "75%" },
        backgroundColor: "none",
        borderRadius: "10px",
        position: "relative",
      }}
    >
      <div className="col-sm-12 container message-box-cntnr-disp ">
        <ChatDisplayHeader />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "80px",
            paddingBottom: "80px",
          }}
        >
          {chatMsgs.map((item) => {
            return (
              <div
                className={
                  item.userId === userId
                    ? "m-1 d-flex message-component-container-user-right"
                    : "m-1 d-flex message-component-container-receiver-left"
                }
                key={item.id}
              >
                <div
                  className={
                    item.userId === userId
                      ? "p-2  my-1 component-container-user-right-inner"
                      : "p-2  my-1 component-container-user-left-inner"
                  }
                >
                  <h6 key={item.id}>{item.message}</h6>
                  <p>{new Date(item.updatedAt).toLocaleTimeString()}</p>
                </div>
              </div>
            );
          })}
        </Box>
        <ChatInput />
      </div>
    </Card>
  );
};

export default ChatDisplay;
