const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const userModel = require("./model/user");
const chatModel = require("./model/chats");
const groupModel = require("./model/group");
const userGroupModel = require("./model/userGroup");
const inviteModel = require("./model/invites");

const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chat");
const groupRoutes = require("./routes/group");
const inviteRoutes = require("./routes/invite");

const app = express();
const socketIoModule = require("./socket/index");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import and use routes --------------------------------------------
app.use("/", userRoutes);
app.use("/", groupRoutes);
app.use("/chat", chatRoutes);
app.use("/", inviteRoutes);

// model relations ---------------------------------------------------
userModel.hasMany(chatModel);
chatModel.belongsTo(userModel);
groupModel.hasMany(chatModel);
chatModel.belongsTo(groupModel);
userModel.belongsToMany(groupModel, {
  through: userGroupModel,
});
userModel.hasMany(inviteModel);
inviteModel.belongsTo(userModel);

const sequelize = require("./utils/database");
sequelize
  .sync()
  // .sync({ force: true })
  .then(() => {
    const server = app.listen(process.env.PORT || 3001, () => {
      console.log("DB CONNECTED");
    });

    const io = require("socket.io")(server, {
      cors: {
        origin: "http://localhost:3000",
      },
    });
    socketIoModule.init(io);
  })
  .catch((error) => {
    console.log(error);
  });
