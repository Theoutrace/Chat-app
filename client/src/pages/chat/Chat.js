import React from "react";
import ChatDisplay from "../../components/chatDisplay/ChatDisplay";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Chat.css";

const Chat = () => {
  return (
    <div className=" p-2 d-flex container additional-chat-page-design-css">
      <Sidebar />
      <ChatDisplay />
    </div>
  );
};

export default Chat;
