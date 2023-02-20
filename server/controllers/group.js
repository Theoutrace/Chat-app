const UserGroup = require("../model/userGroup");
const User = require("../model/user");
const Group = require("../model/group");

exports.createGroup = async (req, res, next) => {
  const { groupName } = req.body;
  try {
    if (!groupName) {
      return res.status(404).json({ message: "Invalid Credentials!" });
    }
    await req.user.createGroup({ name: groupName });
    return res.status(201).json({ message: "Successfully created new group!" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getGroups = async (req, res, next) => {
  try {
    const userGroup = await UserGroup.findAll({
      where: { userId: req.user.id },
    });
    let groups = [];
    for (let i = 0; i < userGroup.length; i++) {
      let group = await Group.findByPk(userGroup[i].groupId);
      groups.push(group);
    }
    if (!groups) {
      return res
        .status(200)
        .json({ groups: [], message: "Group is empty!", success: true });
    } else {
      return res.status(200).json({
        groups: groups,
        message: "user related groups",
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
