const express = require("express");
const group = require("../controllers/group");
const auth = require("../auth/auth");

const router = express.Router();

router.post("/groups/create", auth.postAuth, group.createGroup);
router.get("/groups/getgroups", auth.postAuth, group.getGroups);
router.get("/groups/getmembers/:groupId", auth.postAuth, group.getGroupMembers);
router.post("/groups/makeadmin", auth.postAuth, group.makeAdmin);
router.post("/groups/removemember", auth.postAuth, group.postRemoveMember);

module.exports = router;
