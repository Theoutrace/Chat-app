const express = require("express");
const { postAuth } = require("../auth/auth");
const router = express.Router();
const chatController = require("../controllers/chat");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/message", postAuth, chatController.postMessage);
router.get("/userchats/:id", postAuth, chatController.getChats);
router.post(
  "/userchats/uploadfiles",
  postAuth,
  upload.single("file"),
  chatController.uploadFiles
);

module.exports = router;
