/**
 * ================
 * ||   server    ||
 * ================
 */
const jwt = require("jsonwebtoken");
const User = require("./../model/user");
const UserGroup = require("./../model/userGroup");

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

    socket.on("send-group-invite", (data, personalRoom) => {
      socket.to(personalRoom).emit("invitation-notification", data);
    });

    socket.on("join-private-group", (groupDetails) => {
      socket.join(groupDetails.groupId);
    });

    socket.on("send-message", (data, callback) => {
      socket.to(data.groupId).emit("message-in-server", data);
    });

    socket.on("disconnect", () => {
      console.log("A user has disconnected");
    });
  });
}

module.exports = { init };
