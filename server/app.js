const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./utils/database");
require("dotenv").config();
const userModel = require("./model/user");
const chatModel = require("./model/chats");
const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chat");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", userRoutes);
app.use("/chat", chatRoutes);

userModel.hasMany(chatModel);
chatModel.belongsTo(userModel);

sequelize
  .sync()
  //   .sync({ force: true })
  .then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log("DB CONNECTED");
    });
  })
  .catch((error) => {
    console.log(error);
  });
