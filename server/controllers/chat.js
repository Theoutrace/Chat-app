const Chat = require("../model/chats");
const UserGroup = require("../model/userGroup");
const { Op } = require("sequelize");
const User = require("../model/user");
const S3services = require("../services/s3Service");

exports.postMessage = async (req, res, next) => {
  const { message, groupId, isUrl } = req.body;
  try {
    if (!message) {
      return res.status(400).json({ message: "No message sent!" });
    } else {
      await req.user.createChat({
        message,
        groupId,
        isUrl,
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
          const { id, message, createdAt, groupId, isUrl } = chat[j];
          const singleChatObj = {
            messageId: id,
            message,
            createdAt,
            groupId,
            senderId,
            senderName,
            isUrl,
          };
          chats.push(singleChatObj);
        }
      }
    } else {
      for (let j = 0; j < groups.length; j++) {
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

// upload files
exports.uploadFiles = async (req, res) => {
  console.log(req.file);
  // console.log(req.file);
  // const fileN = Buffer.from(buffer).toString("base64");

  // const fileN = req.body.buffer;
  // const fileExtension = req.file.mimetype.split("/")[1];
  // console.log(fileExtension);
  // const fileName = `${req.file.filename}.${fileExtension}`;
  // console.log("file", req.file);

  const fileURL = await S3services.uploadtoS3(fileN, fileName);
  // // const dataFrmChat = await req.user.createChat({
  // //   message: fileURL.Location,
  // //   groupId: data.groupId,
  // //   isUrl: true,
  // // });
  console.log(fileURL);
  return res.status(200).json({
    createdAt: "2023-03-03T04:02:59.000Z",
    groupId: 60,
    isUrl: true,
    message: fileURL.Location,
    messageId: 136,
    senderId: 8,
    senderName: "Prakash",
  });
};

exports.getFile = async (req, res) => {
  const file = await S3services.getFrons3();
  return res.status(201);
};
