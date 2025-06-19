const jwt = require("jsonwebtoken");
const { Usermodel } = require("../Models/User.model");
const { ApiError } = require("../utils/ApiError");
const { GenerateToken } = require("../Controller/UserController");
const { ApiResponse } = require("../utils/ApiResponse");

const AuthMiddlewere = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;
    if (!accessToken || !refreshToken) {
      throw new ApiError(400, "Unauthorised request");
    }
    let userid;
    try {
      userid = jwt.verify(accessToken, "ugwdjkgfduuiyfufuvhc");
    } catch (error) {
      if (error.message === "jwt expired") {
        try {
          userid = jwt.verify(refreshToken, "ggyfdkyuwtfyugcdgjkhg");
          if (!userid || userid.refreshToken !== refreshToken) {
            throw new ApiError(400, "Session expired");
          }
          const { accessToken } = await GenerateToken(userid._id);
          res.cookie("accessToken", accessToken);
        } catch (error) {
          res.clearCookie("accessToken").clearCookie("refreshToken");
          throw new ApiError(400, "Session expired");
        }
      } else {
        throw new ApiError(400, "Unauthorised request");
      }
    }
    const findUser = await Usermodel.findById(userid.id);

    if (findUser === null) {
      throw new ApiError(400, "Unauthorised request");
    }
    req.user = findUser;

    next();
  } catch (error) {
    return res.json(new ApiResponse(error.statuscode, null, error.message));
  }
};
module.exports = AuthMiddlewere;
