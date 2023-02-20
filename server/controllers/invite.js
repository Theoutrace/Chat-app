const Group = require("../model/group");
const Invite = require("../model/invites");
const UserGroup = require("../model/userGroup");

exports.postInvite = async (req, res) => {
  try {
    const inviteData = req.body;
    await req.user.createInvite({
      receiverId: inviteData.receiverId,
      groupId: inviteData.groupId,
      status: inviteData.status,
    });
    res.status(200).json({ message: "Invite sent!", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong!", success: false, error });
  }
};

exports.getInvite = async (req, res) => {
  try {
    const invitations = await Invite.findAll({
      where: { receiverId: req.user.id, status: "pending" },
    });
    if (!invitations.length) {
      return res.status(200).json({
        message: "No invitations pending!",
        success: true,
        invitations: [],
      });
    } else {
      return res.status(200).json({
        message: "Got all pending invitations",
        invitations,
        success: true,
        sender: req.user.name,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "someting went wrong!", success: false, error });
  }
};

exports.acceptReject = async (req, res) => {
  try {
    const requestObj = req.body;
    console.log(requestObj);
    if (requestObj.status === "rejected") {
      await Invite.update(
        { status: requestObj.status },
        { where: { id: requestObj.notification.id } }
      );
      return res
        .status(200)
        .json({ message: "Rejected invite", success: true });
    } else {
      await Invite.update(
        { status: requestObj.status },
        { where: { id: requestObj.notification.id } }
      );
      await UserGroup.create({
        userId: req.user.id,
        groupId: requestObj.notification.groupId,
      });
      const addedInGroup = await Group.findAll({
        where: { id: requestObj.notification.groupId },
      });
      console.log(addedInGroup);
      return res.status(200).json({
        groups: addedInGroup,
        message: "Accepted invite",
        success: true,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong", success: false });
  }
};
