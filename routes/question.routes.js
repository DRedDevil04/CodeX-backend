import express from "express";
import { createProblem, deleteProblem, getAllProblems, getProblemById, updateProblem } from "../controllers/question.controller.js";
import { isAdmin, requireSignIn } from "../middlewares/auth.middleware.js";
import { validateProblem } from "../middlewares/problem.middleware.js";

const router = express.Router();

router.get("/", getAllProblems);
router.get("/:id",getProblemById)
router.post("/",requireSignIn,isAdmin,validateProblem,createProblem);
router.patch("/:id", requireSignIn, isAdmin, updateProblem);
router.delete("/:id",requireSignIn,isAdmin,deleteProblem);

export default router;
