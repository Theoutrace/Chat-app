import React, { useEffect } from "react";
import ChatDisplay from "../../components/chatDisplay/ChatDisplay";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./Chat.css";
import { ChatActions } from "../../Store/reducers/chat-reducer";
import { AuthActions } from "../../Store/reducers/auth-reducer";

const Chat = () => {
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
      : msgInLocal[msgInLocal.length - 1].id;
  if (askId !== 0) {
    dispatch(ChatActions.addChat(msgInLocal));
  }
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
        msgInLocal === null ||
        msgInLocal === "undefined" ||
        msgInLocal.length === 0
      ) {
        const dataCombined = [...response.data.chats];
        localStorage.setItem("message", JSON.stringify(dataCombined));
        dispatch(ChatActions.addChat(response.data.chats));
      } else {
        let dataCombined = [...msgInLocal, ...response.data.chats];
        if (dataCombined.length >= 10) {
          dataCombined = dataCombined.slice(-10);
          localStorage.setItem("message", JSON.stringify(dataCombined));
          dispatch(ChatActions.addChat(dataCombined));
        } else {
          localStorage.setItem("message", JSON.stringify(dataCombined));
          dispatch(ChatActions.addChat(dataCombined));
        }
      }
    })();
  }, [fetchMsg, dispatch, auth, askId]);
  return (
    <div className=" p-2 d-flex container additional-chat-page-design-css">
      <Sidebar />
      <ChatDisplay />
    </div>
  );
};

export default Chat;
