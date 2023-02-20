const express = require("express");
const inviteController = require("../controllers/invite");
const auth = require("../auth/auth");

const router = express.Router();

router.post("/user/invite", auth.postAuth, inviteController.postInvite);
router.get("/user/getinvite", auth.postAuth, inviteController.getInvite);

router.post(
  "/user/invite/status",
  auth.postAuth,
  inviteController.acceptReject
);

module.exports = router;
