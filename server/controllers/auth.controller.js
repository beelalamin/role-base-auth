import aysncHandler from "express-async-handler";
import User from "../models/auth.model.js";
import generateToken from "../utils/generateToken.js";

// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public

const authUser = aysncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id, user.role);
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      position: user.position,
      role: user.role,
    });
  } else {
    res.status(401).json({ message: "Invalid Credentials!" });
    throw new Error("Invalid email or password");
  }
});

// @desc    Register user
// route    POST /api/users/register
// @access  Public

const registerUser = aysncHandler(async (req, res) => {
  const { firstName, lastName, position, email, password, role, avatar } =
    req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: "Email already registered" });
    throw new Error("User already exist");
  }

  const user = await User.create({
    firstName,
    lastName,
    position,
    email,
    password,
    role,
    avatar: avatar.filename,
  });

  // const userAvatar = await User.create({ avatar: avatar.filename });

  // if (!userAvatar) {
  //   res.status(400).json({ message: "Invalid user avatar!" });
  // }

  if (user) {
    res.status(201).json({ message: "User Created Successfully!" });
  } else {
    res.status(400).json({ message: "Invalid user data" });
    throw new Error("Invalid user data");
  }
});

// @desc    Logout user
// route    POST /api/users/logout
// @access  Public

const LogoutUser = aysncHandler(async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "User sign out successfully" });
});

// @desc    Get user profile
// route    GET /api/users/:id
// @access  Private

const getUserProfile = aysncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);

  if (!user) {
    res.status(401).json({ message: "User doesn't exist!" });
  } else {
    res.send(user);
    // id: user._id,
    // firstName: user.firstName,
    // lastName: user.lastName,
    // position: user.position,
    // email: user.email,
    // role: user.role,
  }
});

// @desc    Update user profile
// route    PUT /api/user:id
// @access  Private

const updateUserProfile = aysncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.position = req.body.position || user.position;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      position: updatedUser.position,
      email: updatedUser.email,
      role: updatedUser.role,
      message: "User Updated Successfully",
    });
  } else {
    res.status(404).json({ message: "Failed to update user" });
    throw new Error("User Not Found");
  }
});

// @desc    Get all users
// route    GET /api/users
// @access  Private

const getAllUsers = aysncHandler(async (req, res) => {
  const users = await User.find({});

  if (!users)
    return res.status(404).json({ message: "Failed to fetch user data" });
  res.send(users);
});

// @desc    Delete user
// route    Delete /api/user/:id
// @access  Private

const deleteUser = aysncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400).json({ message: "No user found" });
    throw new Error("No user found");
  }

  await user.deleteOne();

  res.status(201).json({ message: "User deleted successfully!" });
  // const id = req.params.id;
  // const users = await User.findOneAndRemove(id, (err) => {
  //   if (err) return res.status(401).json({ message: "Failed to delete user" });
  //   res.status(200).json({ message: "User deleted successfully" });
  // });

  // if (!users)
  //   return res.status(404).json({ message: "Failed to fetch user data" });
  // res.send(users);
});

export {
  authUser,
  registerUser,
  LogoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
};
