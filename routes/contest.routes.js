import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/auth.middleware.js";
import {
  createContest,
  deleteContest,
  getContest,
  updateContest,
} from "../controllers/contest.controller.js";

const router = express.Router();

router.get("/", getContest);
router.post("/", requireSignIn, isAdmin, createContest);
router.patch("/:id", requireSignIn, isAdmin, updateContest);
router.delete("/:id", requireSignIn, isAdmin, deleteContest);

export default router;
