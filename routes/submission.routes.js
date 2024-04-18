import express from "express";
import { getAllTestCases } from "../controllers/testcase.controller";
//cont
//middle
const router = express.Router();

router.get("/", getTestCasesByProblem);
router.patch("/:id", headMiddleware, updateLeaderboardEntry);

export default router;
