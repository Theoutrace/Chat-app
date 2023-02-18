const express = require("express");
const { postAuth } = require("../auth/auth");
const router = express.Router();
const chatController = require("../controllers/chat");

router.post("/message", postAuth, chatController.postMessage);
router.get("/userchats", postAuth, chatController.getChats);

module.exports = router;
