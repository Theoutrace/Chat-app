import { createSlice } from "@reduxjs/toolkit";

const ChatSlice = createSlice({
  name: "chat",
  initialState: { chat: [], fetchMsg: false },
  reducers: {
    addChat(state, action) {
      state.chat = action.payload;
    },
    fetchData(state, action) {
      state.fetchMsg = !state.fetchMsg;
    },
  },
});

export const ChatActions = ChatSlice.actions;
export default ChatSlice.reducer;
