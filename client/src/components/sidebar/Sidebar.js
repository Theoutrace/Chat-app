import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { Box } from "@mui/system";
import Group from "../sidebarUser/Group";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ChatActions } from "../../Store/reducers/chat-reducer";
import GroupsIcon from "@mui/icons-material/Groups";
import "./Sidebar.css";
import { Tooltip } from "@mui/material";
import CreateGroup from "../modal/CreateGroup";
import { Provider } from "react-redux";
import Store from "../../Store";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import notiIcon from "./images/notify.png";
import SingleNotification from "../singlenotification/SingleNotification";

const Sidebar = (props) => {
  const dispatch = useDispatch();
  const [showNotifications, setShowNotifications] = useState(false);
  const allGroups = useSelector((state) => state.chat.groups);
  const fetchGroups = useSelector((state) => state.chat.fetchGroups);
  const notifications = useSelector((state) => state.chat.notifications);
  const fetchNotifications = useSelector(
    (state) => state.chat.fetchNotifications
  );
  useEffect(() => {
    (async function fetchGroups() {
      const response = await axios.get(
        `http://localhost:3001/groups/getgroups`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(ChatActions.addGroups(response.data.groups));
    })();
  }, [dispatch, fetchGroups]);

  const createGroupModalHandler = () => {
    props.modal.render(
      <Provider store={Store}>
        <CreateGroup modal={props.modal} />
      </Provider>
    );
  };

  useEffect(() => {
    (async function fetchNotifications() {
      const response = await axios.get(`http://localhost:3001/user/getinvite`, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      dispatch(ChatActions.addNotifications(response.data.invitations));
    })();
  }, [dispatch, fetchNotifications, showNotifications, fetchGroups]);
  const showNotificationsHandler = async () => {
    setShowNotifications((p) => !p);
  };

  return (
    <Card
      sx={{
        background: "#A1A5A63B",
        height: "100%",
        width: { xs: "0px", md: "25%" },
        marginRight: "5px",
        borderRadius: "10px",
        flexGrow: 1,
        display: { xs: "none", md: "block" },
        position: "relative",
        top: "0px",
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: "0",
          zIndex: "5",
          width: "100%",
          height: "60px",
          boxShadow: "rgba(0, 0, 0, 0.20) 0px 2px 15px",
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <div className="d-flex additional-cls-css-sidebar-header-tp">
          <Tooltip title={`${notifications.length} Notifications`}>
            <MarkEmailUnreadIcon
              sx={{
                margin: "10px 20px",
                color: "grey",
                "&:hover": {
                  cursor: "pointer",
                  color: "#1976d2",
                },
                position: "relative",
              }}
              onClick={showNotificationsHandler}
            ></MarkEmailUnreadIcon>
          </Tooltip>
          {notifications.length > 0 && (
            <img
              className="notifi-dot-cls-img"
              src={notiIcon}
              alt="notification"
            />
          )}
          <Tooltip title="+ Create group">
            <GroupsIcon
              sx={{
                margin: "10px 20px",
                color: "grey",
                "&:hover": {
                  cursor: "pointer",
                  color: "#1976d2",
                },
              }}
              onClick={createGroupModalHandler}
            ></GroupsIcon>
          </Tooltip>
        </div>
      </Box>
      <div className="user-cnt-container-div">
        {showNotifications && (
          <div className="not-ifi-cation-container-all-side-bar">
            {notifications.map((item) => {
              return <SingleNotification item={item} />;
            })}
          </div>
        )}
        {allGroups.map((user) => {
          return <Group key={user.id} item={user} />;
        })}
      </div>
    </Card>
  );
};

export default Sidebar;
