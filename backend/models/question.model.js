import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ text: String, isCorrect: Boolean }],
});

const QuestionModel = mongoose.model("Question", questionSchema);
export default QuestionModel;
