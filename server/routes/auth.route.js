import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  LogoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
} from "../controllers/auth.controller.js";
import { protect, protectAdmin } from "../middleware/auth.middleware.js";

import upload from "../middleware/upload.middleware.js";

router.post("/register", [upload.single("avatar"), protectAdmin], registerUser);

router.post("/auth/", authUser);

router.post("/logout", protect, LogoutUser);

router.put(
  "/user/update/:id",
  [upload.single("avatar"), protectAdmin],
  updateUserProfile
);

router.get("/users", getAllUsers);

router.get("/user/:id", protectAdmin, getUserProfile);

router.delete("/user/:id", protectAdmin, deleteUser);

export default router;
