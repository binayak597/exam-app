import mongoose from "mongoose";

const examResultSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    attempted: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const ExamResultModel = mongoose.model("ExamResult", examResultSchema);

export default ExamResultModel;
