import Contest from "../models/contest.schema.js";

// Create a new contest
async function createContest(req, res) {
  try {
    const contestOb={
      ...req.body,
      date:new Date(req.body.date),
      startTime:new Date(req.body.startTime + " " + req.body.date),
      endTime: new Date(req.body.endTime + " " + req.body.date),
      
    }
    const contest = await Contest.create(contestOb);
    return res.status(201).json(contest);
  } catch (error) {
    JSON.stringify(error);
    return res.status(500).json({ error: "Failed to create contest",error});
  }
}

// Get all contests
async function getContest(req, res) {
  try {
    const contests = await Contest.find({});
    return res.status(200).json(contests);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch contests" });
  }
}

// Update a contest
async function updateContest(req, res) {
  try {
    const contest = await Contest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!contest) {
      return res.status(404).json({ error: "contest not found" });
    }
    return res.status(200).json(contest);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update contest" });
  }
}

// Delete a contest
async function deleteContest(req, res) {
  try {
    const contest = await Contest.findByIdAndDelete(req.params.id);
    if (!contest) {
      return res.status(404).json({ error: "contest not found" });
    }
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete contest" });
  }
}

export { createContest, getContest, updateContest, deleteContest };
