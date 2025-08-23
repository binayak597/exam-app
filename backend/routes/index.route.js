import {Router} from "express";

import authRoutes from './auth.route.js';
import examRoutes from './exam.route.js';
import resultRoutes from './result.route.js';

const router = Router();

router.use("/auth", authRoutes);
router.use("/exam", examRoutes);
router.use("/results", resultRoutes);

export default router;