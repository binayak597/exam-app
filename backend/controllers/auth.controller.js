import UserModel from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isUser = await UserModel.findOne({ email });
    if (isUser) return res.status(400).json({ message: "User already exists" });

    const newUser = await UserModel.create({ name, email, password });

    const token = generateToken(newUser._id);
    return res.status(201).json({
      user: newUser,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUser = await UserModel.findOne({ email }).select("+password");

    if (!isUser) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await isUser.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(isUser._id);

    return res.status(200).json({
      user: isUser,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
