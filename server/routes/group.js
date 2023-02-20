const express = require("express");
const group = require("../controllers/group");
const auth = require("../auth/auth");

const router = express.Router();

router.post("/groups/create", auth.postAuth, group.createGroup);
router.get("/groups/getgroups", auth.postAuth, group.getGroups);

module.exports = router;
