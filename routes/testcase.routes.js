import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/auth.middleware.js";
import { createTestCase, deleteTestCase, getTestCasesByProblem, updateTestCase } from "../controllers/testcase.controller.js";

const router = express.Router();

router.get("/", getTestCasesByProblem);
router.post("/",requireSignIn,isAdmin,createTestCase);
router.patch("/:id", requireSignIn,isAdmin,updateTestCase);
router.delete("/:id",requireSignIn,isAdmin,deleteTestCase);

export default router;
