const Chat = require("../model/chats");
const UserGroup = require("../model/userGroup");
const { Op } = require("sequelize");

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
    if (initialId === 0) {
      const groups = await UserGroup.findAll({
        where: { userId: user.id },
      });
      for (let i = 0; i < groups.length; i++) {
        const chat = await Chat.findAll({
          where: { groupId: groups[i].groupId },
          order: [["createdAt", "DESC"]],
          limit: 40,
        });
        chats.push(...chat);
      }
    } else {
      const groups = await UserGroup.findAll({
        where: { userId: user.id },
      });
      for (let i = 0; i < groups.length; i++) {
        const chat = await Chat.findAll({
          where: { groupId: groups[i].groupId, id: { [Op.gt]: initialId } },
          order: [["createdAt", "DESC"]],
          limit: 10,
        });
        chats.push(...chat);
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

exports.getGroupChats = async (req, res) => {
  const groupId = req.params.id;
  try {
    const groupchats = await Chat.findAll({
      where: { groupId: groupId },
      order: [["createdAt", "ASC"]],
      limit: 20,
    });
    if (groupchats.length > 0) {
      return res.status(200).json({ groupchats, success: true });
    } else {
      return res
        .status(200)
        .json({ groupchats: [], message: "No chats available!" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Something went wrong!", success: false });
  }
};
