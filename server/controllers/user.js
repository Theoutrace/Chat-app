const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateAccessToken = (id, name, email, phone) => {
  return jwt.sign({ id, name, email, phone }, process.env.JWT_TOKENKEY);
};

exports.postSignup = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;
    const user = await User.findAll({ where: { email } });
    const userThroughPhone = await User.findAll({ where: { phone } });
    if (user.length) {
      return res.status(550).json({ message: "user email already exists!" });
    } else if (userThroughPhone.length) {
      return res.status(550).json({ message: "Phone already exists!" });
    } else {
      const saltRounds = 10;
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          throw new Error(err);
        }
        await User.create({ name, email, phone, password: hash });
        const userInResponse = await User.findOne({ where: { email: email } });
        return res.status(200).json({
          message: { text: "user created" },
          user: userInResponse,
          token: generateAccessToken(userInResponse.id, name, email, phone),
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
};