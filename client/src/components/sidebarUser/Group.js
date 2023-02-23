import React from "react";
import "./Group.css";
import { Box } from "@mui/system";
import GroupsIcon from "@mui/icons-material/Groups";
import { useDispatch, useSelector } from "react-redux";
import { ChatActions } from "../../Store/reducers/chat-reducer";
import { useNavigate } from "react-router-dom";

const Group = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedGroup = useSelector((state) => state.chat.selectedGroup);

  const openGroupHandler = async () => {
    dispatch(ChatActions.selectGroup(props.item));
    navigate(`/chat/${props.item.id}`);
    const allChatsInLocal = JSON.parse(localStorage.getItem("message"));
    const groupChatFiltered = allChatsInLocal.filter(
      (chat) => chat.groupId === props.item.id
    );
    dispatch(ChatActions.addGroupChats(groupChatFiltered));
    dispatch(ChatActions.fetchGroupMembers());
    dispatch(ChatActions.fetchData());
  };

  return (
    <Box
      onClick={openGroupHandler}
      key={props.item.id}
      sx={{
        backgroundColor: `${
          selectedGroup && selectedGroup.id === props.item.id
            ? "wheat"
            : "white"
        }`,
        height: "55px",
        marginBottom: "3px",
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        paddingLeft: "8px",
        fontWeight: "500",
        "&:hover": {
          backgroundColor: "#ebedee",
          cursor: "pointer",
        },
      }}
    >
      <GroupsIcon
        sx={{
          margin: "10px 20px",
          color: "grey",
          "&:hover": {
            cursor: "pointer",
            color: "#1976d2",
          },
        }}
      ></GroupsIcon>
      <div className="d-flex flex-row user-single-sidebr-outer-contnr">
        <div>
          <h6 className="m-0 p-2">{props.item.name}</h6>
        </div>
      </div>
    </Box>
  );
};

export default Group;
