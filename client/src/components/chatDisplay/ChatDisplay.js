import { Card } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatDisplayHeader from "../chatDisplayUser/ChatDisplayHeader";
import ChatInput from "../chatInput/ChatInput";
import "./ChatDisplay.css";
import groupIcon from "./images/group.png";
import axios from "axios";
import { ChatActions } from "../../Store/reducers/chat-reducer";
import SingleUserInvite from "../singleUser/SingleUserInvite";
import SingleGroupMember from "../singleGroupMember/SingleGroupMember";
import SingleMessage from "./SingleMessage";

const ChatDisplay = () => {
  const groupChatMsgs = useSelector((state) => state.chat.groupChats);
  const selectedGroup = useSelector((state) => state.chat.selectedGroup);
  const fetchUsers = useSelector((state) => state.chat.fetchUsers);
  const showMembers = useSelector((state) => state.chat.showMembers);
  const fetchGroupMembers = useSelector((state) => state.chat.fetchMembers);
  const fetchMembers = useSelector((state) => state.chat.fetchMembers);
  const allUsers = useSelector((state) => state.chat.users);
  const dispatch = useDispatch();
  const messagesEndRef = useRef();
  useEffect(() => {
    (async function fetchUsers() {
      const response = await axios.get(
        `http://54.65.202.166:3000/users/receivers`,
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
  useEffect(() => {
    scrollToBottom();
  }, [groupChatMsgs]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView(); // can add scrollIntoView({ behavior: "smooth" }) for watching scrolling
  };

  useEffect(() => {
    if (selectedGroup) {
      (async function fetchGrpMemb() {
        const response = await axios.get(
          `http://54.65.202.166:3000/groups/getmembers/${selectedGroup.id}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
          }
        );
        dispatch(ChatActions.addGroupMembers(response.data.groupMembers));
        dispatch(ChatActions.addGroupAdmins(response.data.groupAdmins));
      })();
    }
  }, [selectedGroup, fetchGroupMembers, dispatch, fetchMembers]);

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
              {allUsers.length > 1 ? (
                allUsers.map((user) => {
                  return (
                    <div className="p-1" key={user.id}>
                      <SingleUserInvite key={user.id} user={user} />
                    </div>
                  );
                })
              ) : (
                <h6>No users available</h6>
              )}
            </Card>
          )}
          {showMembers && (
            <Card
              sx={{
                position: "absolute",
                zIndex: "8",
                right: { xs: "50px", md: "100px" },
                top: "70px",
                width: "300px",
                padding: "10px 20px",
              }}
            >
              <div className="p-1">
                <SingleGroupMember />
              </div>
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
              return <SingleMessage key={item.id} item={item} />;
            })}
            <div ref={messagesEndRef} />
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
