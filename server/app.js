const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./utils/database");
require("dotenv").config();
const userRoutes = require("./routes/user");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", userRoutes);

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
