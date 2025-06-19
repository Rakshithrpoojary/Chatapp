const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { Usermodel } = require("../Models/User.model");
const jwt = require("jsonwebtoken");
const { Messagemodel } = require("../Models/Message.model");

const GenerateToken = async (id) => {
  const user = await Usermodel.findById(id);
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  return { accessToken, refreshToken };
};
const RegistrationController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (
      Object.values(req.body).some(
        (field) => field === "" || field === null || field === undefined
      )
    ) {
      throw new ApiError(400, "Please fill all the fields");
    }
    const userExist = await Usermodel.findOne({ username, email });
    if (userExist) {
      throw new ApiError(400, "User already exist");
    }
    const user = await Usermodel.create({
      username,
      email,
      password,
    });
    return res.json(new ApiResponse(200, user, "User registered succesfully"));
  } catch (error) {
    return res.json(new ApiResponse(error.statuscode, null, error.message));
  }
};

const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      Object.values(req.body).some(
        (value) => value === "" || value === undefined || value === null
      )
    ) {
      throw new ApiError(400, "Please fill all the fields");
    }
    const userExist = await Usermodel.findOne({ email });
    if (!userExist) {
      throw new ApiError(400, "Invalid email or password");
    }
    const checkPassword = await userExist.isPasswordCheck(password);
    if (!checkPassword) {
      throw new ApiError(400, "Invalid email or password");
    }
    const { accessToken, refreshToken } = await GenerateToken(userExist._id);
    userExist.refreshToken = refreshToken;
    await userExist.save();
    const senderUser = await Usermodel.findById(userExist._id).select(
      "-password -refreshToken"
    );
    const ReciverUserwithoutmsg = await Usermodel.find({})
      .where("email")
      .ne(email)
      .select("-password -refreshToken");
    const ReciverUser = await Promise.all(
      ReciverUserwithoutmsg.map(async (users) => {
        console.log({ ...users });
        const messages = await Messagemodel.find({
          $or: [
            { senderid: users._id, reciverid: senderUser._id },
            { senderid: senderUser._id, reciverid: users._id },
          ],
        }).sort({ createdAt: 1 });

        return { users, messages };
      })
    );
    const options = {
      // httpOnly: true,
      // secure: true,
      // sameSite: "None",
    };
    return res
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { senderUser, ReciverUser },
          "User Loged In succesfully"
        )
      );
  } catch (error) {
    return res.json(new ApiResponse(error.statuscode, null, error.message));
  }
};

const getAllUser = async (req, res) => {
  try {
    const senderUser = req.user;
    const ReciverUserwithoutmsg = await Usermodel.find({})
      .where("email")
      .ne(req.user.email)
      .select("-password -refreshToken");
    const ReciverUser = await Promise.all(
      ReciverUserwithoutmsg.map(async (users) => {
        console.log({ ...users });
        const messages = await Messagemodel.find({
          $or: [
            { senderid: users._id, reciverid: senderUser._id },
            { senderid: senderUser._id, reciverid: users._id },
          ],
        }).sort({ createdAt: 1 });

        return { users, messages };
      })
    );
    return res.json(
      new ApiResponse(
        200,
        { senderUser, ReciverUser },
        "User Details fetched succesfully"
      )
    );
  } catch (error) {
    return res.json(new ApiResponse(error.statuscode, null, error.message));
  }
};
const LogoutController = async (req, res) => {
  try {
    await Usermodel.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          refreshToken: "",
        },
      },
      {
        new: true,
      }
    );
    return res
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json(new ApiResponse(200, null, "User Loged Out succesfully"));
  } catch (error) {
    return res.json(new ApiResponse(error.statuscode, null, error.message));
  }
};

module.exports = {
  RegistrationController,
  LoginController,
  GenerateToken,
  getAllUser,
  LogoutController,
};
