import {Router} from "express";
import { getResults } from "../controllers/result.controller.js";
import authUser from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authUser, getResults);

export default router;
