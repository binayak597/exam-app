import {Router} from "express";
import { startExam, submitExam } from "../controllers/exam.controller.js";
import authUser from "../middlewares/auth.middleware.js";

const router = Router();


router.get("/start", authUser, startExam);
router.post("/submit", authUser, submitExam);

export default router;
