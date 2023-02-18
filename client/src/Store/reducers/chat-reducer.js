import { createSlice } from "@reduxjs/toolkit";

const ChatSlice = createSlice({
  name: "chat",
  initialState: { chat: [] },
  reducers: {
    addChat(state, action) {
      state.chat = action.payload;
    },
  },
});

export const ChatActions = ChatSlice.actions;
export default ChatSlice.reducer;
