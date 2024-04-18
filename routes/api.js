
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send("API UP AND RUNNING")
});

export default router;
