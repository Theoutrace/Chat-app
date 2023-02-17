import { Card } from "@mui/material";
import React from "react";
import "./ChatDisplayHeader.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import userImage from "../sidebar/images/user.png";

const ChatDisplayHeader = () => {
  return (
    <div className="col-sm-12 add-cls-msg-bx-disp-outer">
      <Card
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          position: "relative",
          borderRadius: "10px 10px 0px 0px",
          boxShadow: "rgba(0, 0, 0, 0.20) 0px 2px 15px",
        }}
      >
        <div className="d-flex col-sm-11 align-item-center">
          <img src={userImage} alt="" width="40" />
          <div className="d-flex align-items-center mx-2 ">user name</div>
        </div>
        <div className="col-sm-1 bg-primary d-flex justify-content-end">
          <MoreVertIcon
            sx={{ position: "absolute", right: "10px", top: "25%" }}
          />
        </div>
      </Card>
    </div>
  );
};

export default ChatDisplayHeader;
