import { Router } from "express";
import {
  deleteUserAccount,
  loginUser,
  logoutUser,
  registerUser,
  searchUsers,
  updateUserDetails,
} from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

// unsecured routes
router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/search").get(searchUsers);

// secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/update").patch(verifyJWT, updateUserDetails);
router.route("/delete").delete(verifyJWT, deleteUserAccount);

export default router;
