import { Card } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ChatDisplayHeader from "../chatDisplayUser/ChatDisplayHeader";
import ChatInput from "../chatInput/ChatInput";
import "./ChatDisplay.css";

const ChatDisplay = () => {
  const DUMMY_MESSAGE = [
    {
      user: "kapil",
      message:
        "Where are you?Duis dolor x reprehenderit in deserunt incididunt nulla tempor cillum.",
    },
    {
      user: "user",
      message: "Where are you?Duis dolor nulla laboris magna do aliqor cillum.",
    },
  ];

  return (
    // <div >
    <Card
      sx={{
        height: "100%",
        backgroundColor: "none",
        borderRadius: "10px",
        position: "relative",
      }}
      className={{ xs: "col-sm-12", md: "col-sm-9" }}
    >
      <div className="col-sm-12 container message-box-cntnr-disp ">
        <ChatDisplayHeader />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "8%",
            paddingBottom: "2%",
            // marginBottom: "3%",
          }}
        >
          {DUMMY_MESSAGE.map((item) => {
            return (
              <div
                className={
                  item.user === "user"
                    ? "m-1 d-flex message-component-container-user-right"
                    : "m-1 d-flex message-component-container-receiver-left"
                }
              >
                <h6>{item.message}</h6>
              </div>
            );
          })}
        </Box>
        <ChatInput />
      </div>
    </Card>
    // </div>
  );
};

export default ChatDisplay;
