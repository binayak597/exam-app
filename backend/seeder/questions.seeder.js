import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/db.js";
import QuestionModel from "../models/question.model.js";

connectDB();

const questions = [
  {
    questionText: "What is the SI unit of Force?",
    options: [
      { text: "Newton", isCorrect: true },
      { text: "Joule", isCorrect: false },
      { text: "Watt", isCorrect: false },
      { text: "Pascal", isCorrect: false },
    ],
  },
  {
    questionText: "Which law states that 'For every action, there is an equal and opposite reaction'?",
    options: [
      { text: "Newton's First Law", isCorrect: false },
      { text: "Newton's Second Law", isCorrect: false },
      { text: "Newton's Third Law", isCorrect: true },
      { text: "Law of Gravitation", isCorrect: false },
    ],
  },
  {
    questionText: "The speed of light in vacuum is approximately?",
    options: [
      { text: "3 × 10^8 m/s", isCorrect: true },
      { text: "3 × 10^6 m/s", isCorrect: false },
      { text: "3 × 10^5 m/s", isCorrect: false },
      { text: "3 × 10^10 m/s", isCorrect: false },
    ],
  },
  {
    questionText: "What is the acceleration due to gravity on Earth?",
    options: [
      { text: "9.8 m/s²", isCorrect: true },
      { text: "10 m/s²", isCorrect: false },
      { text: "8.9 m/s²", isCorrect: false },
      { text: "12 m/s²", isCorrect: false },
    ],
  },
  {
    questionText: "Which of the following is a vector quantity?",
    options: [
      { text: "Speed", isCorrect: false },
      { text: "Mass", isCorrect: false },
      { text: "Velocity", isCorrect: true },
      { text: "Work", isCorrect: false },
    ],
  },
  {
    questionText: "The unit of electric current is?",
    options: [
      { text: "Coulomb", isCorrect: false },
      { text: "Ampere", isCorrect: true },
      { text: "Ohm", isCorrect: false },
      { text: "Volt", isCorrect: false },
    ],
  },
  {
    questionText: "Energy stored in a stretched spring is?",
    options: [
      { text: "Kinetic Energy", isCorrect: false },
      { text: "Potential Energy", isCorrect: true },
      { text: "Thermal Energy", isCorrect: false },
      { text: "Radiant Energy", isCorrect: false },
    ],
  },
  {
    questionText: "Which phenomenon explains why we see a rainbow?",
    options: [
      { text: "Reflection", isCorrect: false },
      { text: "Refraction and Dispersion", isCorrect: true },
      { text: "Diffraction", isCorrect: false },
      { text: "Interference", isCorrect: false },
    ],
  },
  {
    questionText: "Work done is said to be zero when:",
    options: [
      { text: "Force is applied at an angle", isCorrect: false },
      { text: "There is no displacement", isCorrect: true },
      { text: "Force is perpendicular to displacement", isCorrect: false },
      { text: "Force is in the direction of displacement", isCorrect: false },
    ],
  },
  {
    questionText: "Who proposed the theory of relativity?",
    options: [
      { text: "Isaac Newton", isCorrect: false },
      { text: "Albert Einstein", isCorrect: true },
      { text: "Galileo Galilei", isCorrect: false },
      { text: "James Clerk Maxwell", isCorrect: false },
    ],
  },
];

const importData = async () => {
  try {
    await QuestionModel.deleteMany();
    await QuestionModel.insertMany(questions);
    console.log("Sample Physics Questions Seeded!");
    process.exit();
  } catch (error) {
    console.error("Error while seeding data:", error);
    process.exit(1);
  }
};

importData();
