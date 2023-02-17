const express = require("express");
const { postAuth } = require("../auth/auth");
const router = express.Router();
const chatController = require("../controllers/chat");

router.post("/message", postAuth, chatController.postMessage);

module.exports = router;
