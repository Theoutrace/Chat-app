const ChatModel = require("../model/chats");
const { Op } = require("sequelize");

exports.postMessage = async (req, res, next) => {
  const { message } = req.body;
  try {
    if (!message) {
      return res.status(400).json({ message: "No message sent!" });
    } else {
      await req.user.createChat({
        message,
      });

      return res.status(200).json({ message: "Message added to DB!" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

exports.getChats = async (req, res) => {
  const initialId = req.params.id;
  // console.log("initialId", initialId);
  const user = req.user;
  try {
    let chats;
    if (initialId === 0) {
      chats = await ChatModel.findAll({
        where: { userId: user.id },
        order: [["createdAt", "DESC"]],
        limit: 10,
      });
    } else {
      chats = await ChatModel.findAll({
        where: { userId: user.id, id: { [Op.gt]: initialId } },
        order: [["createdAt", "DESC"]],
        limit: 10,
      });
    }
    // console.log("chats.length", chats.length);
    if (chats.length > 0) {
      chats = chats.reverse();
      return res.status(200).json({ chats, success: true });
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
