const jwt = require("jsonwebtoken");
const User = require("./../model/user");
const UserGroup = require("./../model/userGroup");
const Chat = require("../model/chats");
const Invite = require("../model/invites");
const S3services = require("../services/s3Service");

const validateUser = async (token) => {
  const user = jwt.verify(token, process.env.JWT_TOKENKEY);
  const foundUser = await User.findOne({ where: { id: user.id } });
  if (!foundUser) {
    throw new Error("user not found");
  } else {
    return foundUser;
  }
};

function init(io) {
  io.use(async (socket, next) => {
    const auth = socket.handshake.auth.token;
    if (!auth) {
      return next(new Error("Authentication error"));
    }
    socket.user = await validateUser(auth);
    next();
  });

  io.on("connection", async (socket) => {
    if (socket.user.id) {
      socket.join(socket.user.id);
      const userGroups = await UserGroup.findAll({
        where: { userId: socket.user.id },
      });
      if (userGroups.length > 0) {
        for (let i = 0; i < userGroups.length; i++) {
          socket.join(userGroups[i].groupId);
          console.log(
            `${socket.user.name} joined group : ${userGroups[i].groupId}`
          );
        }
      }
    }

    socket.on("send-group-invite", async (data, personalRoom) => {
      try {
        await socket.user.createInvite({
          receiverId: data.receiverId,
          groupId: data.groupId,
          status: data.status,
          invitorName: data.invitorName,
          groupName: data.groupName,
        });
        socket.to(personalRoom).emit("invitation-notification", data);
      } catch (error) {
        console.log("Invite error in :: send-group-invite ", error);
      }
    });

    socket.on("join-private-group", (groupDetails) => {
      socket.join(groupDetails.groupId);
    });

    socket.on("send-message", async (data) => {
      console.log("hlo:", data);
      //add data to the chat table in DB
      // step 1: find user using data.senderId
      const user = await User.findOne({ where: { id: data.senderId } });
      // console.log(user);
      // step 2: create a chat in chat table
      const { message, groupId, isUrl } = data;
      await user.createChat({ message, groupId, isUrl });

      // step 3: send the message to all users in group including sender
      io.to(data.groupId).emit("new-message", data);
    });

    socket.on("disconnect", () => {
      console.log("A user has disconnected");
    });
  });
}

module.exports = { init };
