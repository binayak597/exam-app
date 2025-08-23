import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

const authUser = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token" });
  }

  try {
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

    const isUser = await UserModel.findById(decodedPayload._id);

    if (!isUser) {
      return res.status(401).json({ message: "Unauthorized, no token" });
    }

    req.user = isUser;

    return next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ message: "Unauthorized, token failed" });
  }
};

export default authUser;
