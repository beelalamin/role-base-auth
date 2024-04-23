import jwt from "jsonwebtoken";

const generateToken = (res, userID, userRole) => {
  const token = jwt.sign({ id: userID, role: userRole }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    //secure: true,
    // sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
