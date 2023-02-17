const jwt = require("jsonwebtoken");
const User = require("../model/user");

exports.postAuth = async (req, res, next) => {
  const token = req.header("Authorization");
  const user = jwt.verify(token, process.env.JWT_TOKENKEY);

  if (!user) {
    return res
      .statue(404)
      .res({ message: "user has wrong auth : unauthorised!" });
  }

  const foundUser = await User.findByPk(user.id);
  if (!foundUser) {
    return res.statue(404).res({ message: "user unauthorised!" });
  }
  req.user = foundUser;
  next();
};
