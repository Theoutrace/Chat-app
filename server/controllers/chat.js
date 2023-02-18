const ChatModel = require("../model/chats");

exports.postMessage = async (req, res, next) => {
  const { message } = req.body;
  const user = req.user;
  try {
    if (!message) {
      return res.status(400).json({ message: "No message sent!" });
    } else {
      const data = await req.user.createChat({
        message,
      });

      return res.status(200).json({ message: "Message added to DB!" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

exports.getChats = async (req, res) => {
  const user = req.user;
  try {
    const chats = await ChatModel.findAll({ where: { userId: user.id } });
    if (chats.length > 0) {
      return res.status(200).json({ chats, success: true });
    } else {
      return res.status(200).json({ message: "No chats available!" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Something went wrong!", success: false });
  }
};
