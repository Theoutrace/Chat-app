import React, { useEffect } from "react";
import ChatDisplay from "../../components/chatDisplay/ChatDisplay";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./Chat.css";
import { ChatActions } from "../../Store/reducers/chat-reducer";

const Chat = () => {
  const dispatch = useDispatch();
  const chatMsgs = useSelector((state) => state.chat.chat);
  useEffect(() => {
    const auth = localStorage.getItem("token");
    (async function fetchChat() {
      const response = await axios.get(`http://localhost:3001/chat/userchats`, {
        headers: { Authorization: auth, "Content-Type": "application/json" },
      });
      dispatch(ChatActions.addChat(response));
    })();
  }, [chatMsgs.length]);
  return (
    <div className=" p-2 d-flex container additional-chat-page-design-css">
      <Sidebar />
      <ChatDisplay />
    </div>
  );
};

export default Chat;
