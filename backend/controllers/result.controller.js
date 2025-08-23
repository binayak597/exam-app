import ExamResultModel from "../models/examResult.model.js";

export const getResults = async (req, res) => {
  try {
    const results = await ExamResultModel.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
