import TestCase from "../models/testcase.schema.js";

// Create a new test case
async function createTestCase(req, res) {
  try {
    const testCase = await TestCase.create({
      question: req.body.problem,
      output: req.body.output,
      input: req.files.input,
    });
    return res.status(201).send({
      success: true,
      testCase,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

// Get all test cases
async function getTestCasesByProblem(req, res) {
  try {
    const testCases = await TestCase.find({ problem: req.params.pid });
    return res.status(200).json(testCases);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch test cases" });
  }
}

// Get a test case by ID
async function getTestCaseById(req, res) {
  try {
    const testCase = await TestCase.findById(req.params.id);
    if (!testCase) {
      return res.status(404).json({ error: "Test case not found" });
    }
    return res.status(200).json(testCase);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch test case" });
  }
}

// Update a test case
async function updateTestCase(req, res) {
  try {
    const testCase = await TestCase.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!testCase) {
      return res.status(404).json({ error: "Test case not found" });
    }
    return res.status(200).json(testCase);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update test case" });
  }
}

// Delete a test case
async function deleteTestCase(req, res) {
  try {
    const testCase = await TestCase.findByIdAndDelete(req.params.id);
    if (!testCase) {
      return res.status(404).json({ error: "Test case not found" });
    }
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete test case" });
  }
}

export {
  createTestCase,
  getTestCasesByProblem,
  getTestCaseById,
  updateTestCase,
  deleteTestCase,
};
