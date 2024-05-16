import axios from "axios";
import questionSchema from "../models/question.schema.js";
import Submission from "../models/submission.schema.js";
import testcaseSchema from "../models/testcase.schema.js";
import userSchema from "../models/user.schema.js";
import { submissionQueue } from "../utils/submissionQueue.util.js";
// Create a new submission
async function createSubmission(req, res) {
  try {
    const code = req.files.code;
    console.log(code);
    const submission = await Submission.create({
      ...req.body,
      user: req.user._id,
    });
    await submissionQueue.add({
      code: code,
      submission: submission,
      problem: req.body.problem,
      userid: req.user._id,
    });
    return res.status(201).send({
      status: true,
      submission,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
}

// Get all submissions
async function getAllSubmissions(req, res) {
  try {
    const submissions = await Submission.find().populate(["user", "problem"]);
    return res.status(200).json(submissions);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to fetch submissions" });
  }
}

// Get a submission by ID
async function getSubmissionById(req, res) {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ error: "Submission not found" });
    }
    return res.status(200).json(submission);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch submission" });
  }
}

// Update a submission
async function updateSubmission(req, res) {
  try {
    const submission = await Submission.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!submission) {
      return res.status(404).json({ error: "Submission not found" });
    }
    return res.status(200).json(submission);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update submission" });
  }
}

// Delete a submission
async function deleteSubmission(req, res) {
  try {
    const submission = await Submission.findByIdAndDelete(req.params.id);
    if (!submission) {
      return res.status(404).json({ error: "Submission not found" });
    }
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete submission" });
  }
}

export {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
  updateSubmission,
  deleteSubmission,
};
