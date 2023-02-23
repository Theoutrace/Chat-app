import { createSlice } from "@reduxjs/toolkit";

const ChatSlice = createSlice({
  name: "chat",
  initialState: {
    chat: [],
    fetchMsg: false,
    groups: [],
    fetchGroups: false,
    groupChats: [],
    selectedGroup: null,
    fetchUsers: false,
    users: [],
    notifications: [],
    fetchNotifications: false,
    showMembers: false,
    chatMembers: [],
    fetchMembers: false,
    selectedGroupAdmins: [],
  },
  reducers: {
    addChat(state, action) {
      state.chat = action.payload;
    },
    fetchData(state, action) {
      state.fetchMsg = !state.fetchMsg;
    },
    addGroups(state, action) {
      state.groups = action.payload;
    },
    fetchGroups(state, action) {
      state.fetchGroups = !state.fetchGroups;
    },

    selectGroup(state, action) {
      state.selectedGroup = action.payload;
    },
    addGroupChats(state, action) {
      state.groupChats = action.payload;
    },

    fetchUsers(state, action) {
      state.fetchUsers = !state.fetchUsers;
    },
    addUsers(state, action) {
      state.users = action.payload;
    },
    addNotifications(state, actions) {
      state.notifications = actions.payload;
    },
    fetchinvite(state, action) {
      state.fetchNotifications = !state.fetchNotifications;
    },
    showMembers(state) {
      state.showMembers = !state.showMembers;
    },
    addGroupMembers(state, action) {
      state.chatMembers = action.payload;
    },
    addGroupAdmins(state, action) {
      state.selectedGroupAdmins = action.payload;
    },
    fetchGroupMembers(state) {
      state.fetchMembers = !state.fetchMembers;
    },
  },
});

export const ChatActions = ChatSlice.actions;
export default ChatSlice.reducer;
