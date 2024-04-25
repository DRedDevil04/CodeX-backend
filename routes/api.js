
import express from "express";
import submissionRoutes from "./submission.routes.js"
import authRoutes from "./auth.routes.js"
import problemRoutes from "./question.routes.js"
import testcaseRoutes from "./testcase.routes.js"
import leaderboardRoutes from "./leaderboard.routes.js"
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send("API UP AND RUNNING")
});
router.use("/auth",authRoutes)
router.use("/submission",submissionRoutes)
router.use("/problem",problemRoutes)
router.use("/testcase",testcaseRoutes)
router.use("/leaderboard",leaderboardRoutes)

export default router;
