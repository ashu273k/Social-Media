import express from "express";
import {
  editProfile,
  getCurrentUser,
  getProfile,
} from "../controllers/user.controller.js";
import isAuth from "../middlewares/isAuth.js";
import {upload} from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.get("/current", isAuth, getCurrentUser);
userRouter.get("/getprofile/:userName", getProfile);
userRouter.post(
  "/editprofile",
  isAuth,
  upload.single("profileImage"),
  editProfile
);

export default userRouter;
