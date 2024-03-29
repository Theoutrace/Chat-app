const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Chat = sequelize.define("chat", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isUrl: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Chat;
