import Problem from "../models/question.schema.js"

// Create a new problem
async function createProblem(req, res) {
    try {
        const problem = await Problem.create(req.body);
        return res.status(201).json(problem);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to create problem' });
    }
}

// Get all problems
async function getAllProblems(req, res) {
    try {
        const problems = await Problem.find({});
        return res.status(200).json(problems);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch problems' });
    }
}

// Get a problem by ID
async function getProblemById(req, res) {
    try {
        const problem = await Problem.findById(req.params.id);
        if (!problem) {
            return res.status(404).json({ error: 'Problem not found' });
        }
        return res.status(200).json(problem);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch problem' });
    }
}

// Update a problem
async function updateProblem(req, res) {
    try {
        const problem = await Problem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!problem) {
            return res.status(404).json({ error: 'Problem not found' });
        }
        return res.status(200).json(problem);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to update problem' });
    }
}

// Delete a problem
async function deleteProblem(req, res) {
    try {
        const problem = await Problem.findByIdAndDelete(req.params.id);
        if (!problem) {
            return res.status(404).json({ error: 'Problem not found' });
        }
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ error: 'Failed to delete problem' });
    }
}

export { createProblem, getAllProblems, getProblemById, updateProblem, deleteProblem };
