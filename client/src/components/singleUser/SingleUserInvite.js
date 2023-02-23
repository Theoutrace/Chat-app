import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useSelector } from "react-redux";
import axios from "axios";
import jwtDecode from "jwt-decode";

const SingleUserInvite = (props) => {
  const selectedGroup = useSelector((state) => state.chat.selectedGroup);
  const userEmail = localStorage.getItem("email");

  const inviteUserHandler = async () => {
    const inviteObj = {
      receiverId: props.user.id,
      groupId: selectedGroup.id,
      groupName: selectedGroup.name,
      invitorName: jwtDecode(localStorage.getItem("token")).name,
      status: "pending",
    };

    const response = await axios.post(
      `http://localhost:3001/user/invite`,
      inviteObj,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
  };
  return (
    <>
      {userEmail !== props.user.email && (
        <div className="d-flex justify-content-between align-items-center">
          <div>{props.user.name}</div>
          <div>
            <AddCircleOutlineIcon
              onClick={inviteUserHandler}
              sx={{
                color: "#1976d2",
                "&:hover": { cursor: "pointer", color: "#19D564" },
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SingleUserInvite;
