const UserGroup = require("../model/userGroup");
const User = require("../model/user");
const Group = require("../model/group");

exports.createGroup = async (req, res, next) => {
  const { groupName } = req.body;
  try {
    if (!groupName) {
      return res.status(404).json({ message: "Invalid Credentials!" });
    }
    const groupObj = await req.user.createGroup(
      {
        name: groupName,
      },
      { through: { isAdmin: true } }
    );
    return res.status(201).json({
      message: "Successfully created new group!",
      groupObj,
    });
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

exports.getGroupMembers = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const userGrp = await UserGroup.findAll({ where: { groupId } });
    if (userGrp.length > 0) {
      let groupMembers = [];
      let groupAdmins = [];
      for (let i = 0; i < userGrp.length; i++) {
        const isAdmin = userGrp[i].isAdmin;
        const userDetails = await User.findAll({
          where: { id: userGrp[i].userId },
        });
        const { name, id, email, phone } = userDetails[0];
        const usersWithAdminDetails = {
          name,
          id,
          email,
          phone,
          isAdmin,
          groupId,
        };
        if (usersWithAdminDetails.isAdmin) {
          groupAdmins.push(usersWithAdminDetails);
        } else {
          groupMembers.push(usersWithAdminDetails);
        }
      }
      return res.status(200).json({
        groupMembers,
        groupAdmins,
        message: "Members sent!",
        success: true,
      });
    } else {
      return res
        .status(201)
        .json({ message: "No members available!", success: true });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.makeAdmin = async (req, res) => {
  const { groupId } = req.body;
  try {
    let userGroup = await UserGroup.findOne({
      where: { userId: req.body.id, groupId: groupId },
    });
    const result = await userGroup.update({ isAdmin: true });
    return res
      .status(200)
      .json({ message: "New admin created!", success: true, result });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong!", success: false });
  }
};

exports.postRemoveMember = async (req, res) => {
  try {
    const userDetails = req.body;
    const user = req.user;
    console.log(userDetails);
    //check if requesting person is admin
    const userGroupRow = await UserGroup.findOne({
      where: { groupId: userDetails.groupId, userId: user.id },
    });
    if (!userGroupRow.isAdmin) {
      return res.status(400).json({ message: "You are not an admin" });
    } else {
      const userGroupRowToDelete = await UserGroup.findOne({
        where: { groupId: userDetails.groupId, userId: userDetails.memberId },
      });
      console.log(userGroupRowToDelete);
      await userGroupRowToDelete.destroy();
      return res.status(200).json({ message: "member removed!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
