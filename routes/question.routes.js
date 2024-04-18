import express from "express";
import { createProblem, deleteProblem, getAllProblems, updateProblem } from "../controllers/question.controller";
import { isAdmin, requireSignIn } from "../middlewares/auth.middleware";
import { validateProblem } from "../middlewares/problem.middleware";

const router = express.Router();

router.get("/", getAllProblems);
router.post("/",requireSignIn,isAdmin,validateProblem,createProblem);
router.patch("/:id", requireSignIn, isAdmin, updateProblem);
router.delete("/:id",requireSignIn,isAdmin,deleteProblem);

export default router;
