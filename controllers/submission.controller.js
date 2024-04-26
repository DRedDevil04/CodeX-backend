import axios from "axios";
import questionSchema from "../models/question.schema.js";
import Submission from "../models/submission.schema.js";
import testcaseSchema from "../models/testcase.schema.js";
import userSchema from "../models/user.schema.js";

// Create a new submission
async function createSubmission(req, res) {
  try {
    const code = req.files.code;
    const submission = await Submission.create({
      ...req.body,
      user: req.user._id,
    });
    const problem = await questionSchema.findOne({ id: req.body.problem });
    const testCases = await testcaseSchema.find({ question: req.body.problem });
    let flag = 0;
    await Promise.all(
      testCases.map(async (testcase) => {
        var formData = new FormData();
        const codeBlob = new Blob([code.data]);
        const blob = new Blob([testcase.input.data]);
        formData.append("files", codeBlob);
        formData.append("input", blob);
        formData.append("output", testcase.output);
        const resp = await axios.post(
          "http://localhost:3005/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (resp.data.success && resp.data.opstatus !== "accepted") {
          flag = 1;
        }
      })
    );
    
    if (flag == 0) {

      const submissionScheme = await Submission.findByIdAndUpdate(
        submission.id,
        {
          result: "Accepted",
        },
        { new: true }
      );
      const correctSubmissions= await Submission.find({problem:req.body.problem, user: req.user._id})
      if(correctSubmissions.length==1){
        const user= await userSchema.findByIdAndUpdate(req.user._id,{
          $inc: { currentPoints: problem.points }
        })
      }
      return res.status(201).json(submissionScheme);
    } else {
      const submissionScheme = await Submission.findByIdAndUpdate(
        submission.id,
        {
          result: "Wrong Answer",
        },
        { new: true }
      );
      return res.status(201).json(submissionScheme);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
}

// Get all submissions
async function getAllSubmissions(req, res) {
  try {
    const submissions = await Submission.find().populate(['user','question']);
    return res.status(200).json(submissions);
  } catch (error) {
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
