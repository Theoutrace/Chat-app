const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./utils/database");
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
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", userRoutes);
app.use("/", groupRoutes);
app.use("/chat", chatRoutes);
app.use("/", inviteRoutes);

userModel.hasMany(chatModel);
chatModel.belongsTo(userModel);

groupModel.hasMany(chatModel);
chatModel.belongsTo(groupModel);

//user can join many groups and groups can have many users too so we need to map user id and group id in one table to get to know which user in which group
userModel.belongsToMany(groupModel, {
  through: userGroupModel,
});

userModel.hasMany(inviteModel);
inviteModel.belongsTo(userModel);

sequelize
  .sync()
  // .sync({ force: true })
  .then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log("DB CONNECTED");
    });
  })
  .catch((error) => {
    console.log(error);
  });
