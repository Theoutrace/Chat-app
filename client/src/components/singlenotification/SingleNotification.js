import React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { Card } from "@mui/material";
import axios from "axios";
import "./SingleNotification.css";
import { useDispatch, useSelector } from "react-redux";
import { ChatActions } from "../../Store/reducers/chat-reducer";
const SingleNotification = (props) => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.chat.groups);

  const onAcceptHandler = async () => {
    const sendObj = {
      status: "accepted",
      notification: props.item,
    };
    const response = await axios.post(
      `http://localhost:3001/user/invite/status`,
      sendObj,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(response);
    dispatch(ChatActions.fetchGroups());
    dispatch(ChatActions.fetchinvite());
    dispatch(ChatActions.addGroups([...groups, ...response.data.groups]));
  };

  const onRejectHandler = async () => {
    const sendObj = {
      status: "rejected",
      notification: props.item,
    };
    await axios.post(`http://localhost:3001/user/invite/status`, sendObj, {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    dispatch(ChatActions.fetchGroups());
  };

  return (
    <div className="single-noti-receiver-outer-dv m-1">
      <Card sx={{ padding: "15px" }}>
        <div className="p-1 my-2 text-secondary">
          You have been invited by user {props.item.userId} to group
          {props.item.groupId}.
        </div>
        <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="Disabled elevation buttons"
        >
          <Button
            sx={{ backgroundColor: "black", fontSize: "11px" }}
            onClick={onAcceptHandler}
          >
            Accept
          </Button>
          <Button
            sx={{ backgroundColor: "black", fontSize: "11px" }}
            onClick={onRejectHandler}
          >
            Ignore
          </Button>
        </ButtonGroup>
      </Card>
    </div>
  );
};

export default SingleNotification;
