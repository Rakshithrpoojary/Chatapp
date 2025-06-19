const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
User.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
User.methods.isPasswordCheck = async function (password) {
  return await bcrypt.compare(password, this.password);
};
User.methods.generateAccessToken = function () {
  return jwt.sign(
    { id: this._id, email: this.email, username: this.username },
    "ugwdjkgfduuiyfufuvhc",
    { expiresIn: "2d" }
  );
};
User.methods.generateRefreshToken = function () {
  return jwt.sign(
    { id: this._id, email: this.email, username: this.username },
    "ggyfdkyuwtfyugcdgjkhg",
    { expiresIn: "10d" }
  );
};
const Usermodel = mongoose.model("User", User);
module.exports = { Usermodel };
