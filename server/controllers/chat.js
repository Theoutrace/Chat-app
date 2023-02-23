const Chat = require("../model/chats");
const UserGroup = require("../model/userGroup");
const { Op } = require("sequelize");
const User = require("../model/user");

exports.postMessage = async (req, res, next) => {
  const { message, groupId } = req.body;
  try {
    if (!message) {
      return res.status(400).json({ message: "No message sent!" });
    } else {
      await req.user.createChat({
        message,
        groupId,
      });

      return res.status(200).json({ message: "Message added to DB!" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

exports.getChats = async (req, res) => {
  const initialId = parseInt(req.params.id);
  console.log("initialId: ", initialId);
  const user = req.user;
  try {
    let chats = [];
    const groups = await UserGroup.findAll({
      where: { userId: user.id },
    });
    if (initialId === 0) {
      for (let i = 0; i < groups.length; i++) {
        const chat = await Chat.findAll({
          where: { groupId: groups[i].groupId },
          order: [["createdAt", "DESC"]],
        });
        for (let j = 0; j < chat.length; j++) {
          const sender = await User.findOne({
            where: { id: chat[j].userId },
          });
          const senderId = sender.id;
          const senderName = sender.name;
          const { id, message, createdAt, groupId } = chat[j];
          const singleChatObj = {
            messageId: id,
            message,
            createdAt,
            groupId,
            senderId,
            senderName,
          };
          chats.push(singleChatObj);
        }
      }
    } else {
      for (let j = 0; j < groups.length; j++) {
        // console.log(groups[j]);
        const chat = await Chat.findAll({
          where: { groupId: groups[j].groupId, id: { [Op.gt]: initialId } },
          order: [["createdAt", "DESC"]],
        });
        for (let k = 0; k < chat.length; k++) {
          const sender = await User.findOne({
            where: { id: chat[k].userId },
          });
          const senderId = sender.id;
          const senderName = sender.name;
          const { id, message, createdAt, groupId } = chat[k];
          const singleChatObj = {
            messageId: id,
            message,
            createdAt,
            groupId,
            senderId,
            senderName,
          };
          chats.push(singleChatObj);
        }
      }
    }
    let filteredChats = chats.filter(
      (value) => value !== undefined && value !== null
    );
    if (chats.length > 0) {
      filteredChats = filteredChats.reverse();
      return res.status(200).json({ chats: filteredChats, success: true });
    } else {
      return res
        .status(200)
        .json({ chats: [], message: "No chats available!" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Something went wrong!", success: false });
  }
};
