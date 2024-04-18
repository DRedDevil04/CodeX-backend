import express from "express";
import { createSubmission, deleteSubmission, getAllSubmissions, updateSubmission } from "../controllers/submission.controller.js";
import { requireSignIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getAllSubmissions);
router.post("/",requireSignIn,createSubmission);
router.patch("/:id", requireSignIn, updateSubmission);
router.delete("/:id",requireSignIn,deleteSubmission);

export default router;
