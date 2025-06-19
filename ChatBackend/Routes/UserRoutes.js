const { Router } = require("express");
const {
  RegistrationController,
  getAllUser,
  LoginController,
  LogoutController,
} = require("../Controller/UserController");
const AuthMiddlewere = require("../Middleweres/AuthMiddlewere");
const userRouter = Router();
module.exports = { userRouter };

userRouter.post("/register", RegistrationController);
userRouter.post("/login", LoginController);
userRouter.get("/getUser", AuthMiddlewere, getAllUser);
userRouter.post("/logout", AuthMiddlewere, LogoutController);
