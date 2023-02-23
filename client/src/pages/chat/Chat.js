import React, { useEffect } from "react";
import ChatDisplay from "../../components/chatDisplay/ChatDisplay";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./Chat.css";
import { AuthActions } from "../../Store/reducers/auth-reducer";

const Chat = (props) => {
  console.log("chat");
  const dispatch = useDispatch();
  const fetchMsg = useSelector((state) => state.chat.fetchMsg);
  const userEmail = localStorage.getItem("email");
  if (userEmail) {
    dispatch(AuthActions.login({ email: userEmail }));
  }
  const auth = localStorage.getItem("token");
  const msgInLocal = JSON.parse(localStorage.getItem("message"));
  const askId =
    msgInLocal === null || msgInLocal === "undefined" || msgInLocal.length === 0
      ? 0
      : msgInLocal[msgInLocal.length - 1].messageId;

  useEffect(() => {
    (async function fetchChat() {
      const response = await axios.get(
        `http://localhost:3001/chat/userchats/${askId}`,
        {
          headers: {
            Authorization: auth,
            "Content-Type": "application/json",
          },
        }
      );
      if (
        msgInLocal === "undefined" ||
        msgInLocal === null ||
        msgInLocal.length === 0
      ) {
        localStorage.setItem("message", JSON.stringify(response.data.chats));
      } else {
        console.log("optimise here");
        // yet to update and optimise this part, left for some other time in future
        const combinedChats = [...msgInLocal, ...response.data.chats];
        if (combinedChats.length >= 20) {
          localStorage.setItem("message", JSON.stringify(combinedChats));
        } else {
          localStorage.setItem("message", JSON.stringify(combinedChats));
        }
      }
    })();
  }, [fetchMsg, auth, askId, msgInLocal]);

  return (
    <div className=" p-2 d-flex container additional-chat-page-design-css">
      <Sidebar modal={props.modal} />
      <ChatDisplay />
    </div>
  );
};

export default Chat;
