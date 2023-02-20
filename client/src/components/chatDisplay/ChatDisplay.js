import { Card } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatDisplayHeader from "../chatDisplayUser/ChatDisplayHeader";
import ChatInput from "../chatInput/ChatInput";
import jwtDecode from "jwt-decode";
import "./ChatDisplay.css";
import groupIcon from "./images/group.png";
import axios from "axios";
import { ChatActions } from "../../Store/reducers/chat-reducer";
import SingleUserInvite from "../singleUser/SingleUserInvite";

const ChatDisplay = () => {
  const groupChatMsgs = useSelector((state) => state.chat.groupChats);
  const selectedGroup = useSelector((state) => state.chat.selectedGroup);
  const fetchUsers = useSelector((state) => state.chat.fetchUsers);
  const allUsers = useSelector((state) => state.chat.users);
  const dispatch = useDispatch();
  const auth = localStorage.getItem("token");
  const userObj = jwtDecode(auth);
  const userId = userObj.id;
  useEffect(() => {
    (async function fetchUsers() {
      const response = await axios.get(
        `http://localhost:3001/users/receivers`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(ChatActions.addUsers(response.data.users));
    })();
  }, [fetchUsers, dispatch]);

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
      {selectedGroup ? (
        <div className="col-sm-12 container message-box-cntnr-disp ">
          <ChatDisplayHeader />
          {fetchUsers && (
            <Card
              sx={{
                position: "absolute",
                zIndex: "8",
                right: "30px",
                top: "70px",
                width: "200px",
                padding: "10px 20px",
              }}
            >
              {allUsers.map((user) => {
                return (
                  <div className="p-1">
                    <SingleUserInvite user={user} />
                  </div>
                );
              })}
            </Card>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingTop: "80px",
              paddingBottom: "80px",
            }}
          >
            {groupChatMsgs.map((item) => {
              return (
                <>
                  {selectedGroup.id === item.groupId && (
                    <div
                      className={
                        item.userId === userId
                          ? "m-1 d-flex message-component-container-user-right"
                          : "m-1 d-flex message-component-container-receiver-left"
                      }
                      key={item.id}
                    >
                      <span
                        className={
                          item.userId === userId
                            ? "p-2  my-1 component-container-user-right-inner "
                            : "p-2  my-1 component-container-user-left-inner"
                        }
                      >
                        <h6 key={item.id}>{item.message}</h6>
                        <p>
                          {new Date(item.updatedAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </span>
                    </div>
                  )}
                </>
              );
            })}
          </Box>
          <ChatInput />
        </div>
      ) : (
        <div className="col-sm-12 add-cls-ad-non-existent-group-case">
          <img src={groupIcon} alt="" />
          <h4>Create groups and share whatever you want to.</h4>
          <h2 className="my-4 text-primary">Dhindhora</h2>
        </div>
      )}
    </Card>
  );
};

export default ChatDisplay;
