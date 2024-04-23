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

import uploadImage from "../middleware/upload.middleware.js";
import upload from "../utils/uploadImage.js";

router.post("/register", [upload.single("avatar"), protectAdmin], registerUser);

router.post("/auth/", authUser);

router.post("/logout", protect, LogoutUser);

router.put("/user/update/:id", protectAdmin, updateUserProfile);

router.get("/users", protectAdmin, getAllUsers);

router.get("/user/:id", protectAdmin, getUserProfile);

router.delete("/user/:id", protectAdmin, deleteUser);

router.post("/test", uploadImage.single("avatar"), (req, res) => {
  res.json({ message: "recieved", image: req.body.avatar });
});

// router
//   .route("/profile")
//   .get(protect, getUserProfile)
//   .put(protect, updateUserProfile);

export default router;
