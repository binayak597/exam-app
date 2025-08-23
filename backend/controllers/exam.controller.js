
import QuestionModel from "../models/question.model.js";
import ExamResultModel from "../models/examResult.model.js";

export const startExam = async (req, res) => {
  try {
    const questions = await QuestionModel.aggregate([
      { $sample: { size: 10 } },
    ]);
    return res.status(200).json(
      {questions: questions.map((q) => ({
        _id: q._id,
        questionText: q.questionText,
        options: q.options.map((o) => ({ text: o.text })),
      }))}
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const submitExam = async (req, res) => {
  try {
    //answers => [{questionId, selectedOption}]
    const { answers } = req.body;
    let score = 0,
      attempted = 0;

    for (const ans of answers) {
      const q = await QuestionModel.findById(ans.questionId);
      const correctOption = q.options.find((o) => o.isCorrect);
      if (ans.selectedOption === correctOption.text) score++;
      attempted++;
    }

    const result = await ExamResultModel.create({
      user: req.user._id,
      score,
      attempted,
      totalQuestions: answers.length,
    });

    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
