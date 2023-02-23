import { Card } from "@mui/material";
import React from "react";
import "./ChatDisplayHeader.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useDispatch, useSelector } from "react-redux";
import GroupsIcon from "@mui/icons-material/Groups";
import { ChatActions } from "../../Store/reducers/chat-reducer";
import { Button } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const ChatDisplayHeader = () => {
  const selectedGroup = useSelector((state) => state.chat.selectedGroup);
  const dispatch = useDispatch();
  const displayUsersHandler = () => {
    dispatch(ChatActions.fetchUsers());
  };

  const showMembersHandler = () => {
    dispatch(ChatActions.showMembers());
  };
  return (
    <div className="col-sm-12 add-cls-msg-bx-disp-outer">
      <Card
        sx={{
          width: "100%",
          display: "block",
          padding: "10px",
          position: "relative",
          height: "60px",
          borderRadius: "10px 10px 0px 0px",
          boxShadow: "rgba(0, 0, 0, 0.20) 0px 2px 15px",
        }}
      >
        <div className="d-flex col-sm-11 align-item-center justify-content-left">
          {selectedGroup && (
            <GroupsIcon
              sx={{
                margin: "8px 20px",
                color: "grey",
                "&:hover": {
                  cursor: "pointer",
                  color: "#1976d2",
                },
              }}
            ></GroupsIcon>
          )}
          <div className="d-flex align-items-center mx-2 ">
            <h6 className="text-secondary my-2">
              {selectedGroup ? selectedGroup.name : ""}
            </h6>
          </div>
        </div>
        <div className="col-sm-1 bg-primary d-flex justify-content-end align-items-center">
          <Button
            sx={{
              position: "absolute",
              right: "100px",
              top: "25%",
              backgroundColor: "white",
              borderRadius: "20px",
              color: "black",
              padding: "0px 10px",
              border: "2px solid grey",
              textTransform: "capitalize",
              "&:hover": {
                backgroundColor: "#1976D2",
                color: "white",
                border: "2px solid #1976D2",
              },
            }}
            onClick={showMembersHandler}
          >
            <ArrowDropDownIcon />
            Members
          </Button>
          <PersonAddIcon
            sx={{ position: "absolute", right: "50px", top: "25%" }}
            onClick={displayUsersHandler}
          />
          <MoreVertIcon
            sx={{ position: "absolute", right: "10px", top: "25%" }}
          />
        </div>
      </Card>
    </div>
  );
};

export default ChatDisplayHeader;
