import Submission from '../models/submission.schema';

// Create a new submission
async function createSubmission(req, res) {
    try {
        const submission = await Submission.create(req.body);
        return res.status(201).json(submission);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to create submission' });
    }
}

// Get all submissions
async function getAllSubmissions(req, res) {
    try {
        const submissions = await Submission.find();
        return res.status(200).json(submissions);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch submissions' });
    }
}

// Get a submission by ID
async function getSubmissionById(req, res) {
    try {
        const submission = await Submission.findById(req.params.id);
        if (!submission) {
            return res.status(404).json({ error: 'Submission not found' });
        }
        return res.status(200).json(submission);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch submission' });
    }
}

// Update a submission
async function updateSubmission(req, res) {
    try {
        const submission = await Submission.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!submission) {
            return res.status(404).json({ error: 'Submission not found' });
        }
        return res.status(200).json(submission);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to update submission' });
    }
}

// Delete a submission
async function deleteSubmission(req, res) {
    try {
        const submission = await Submission.findByIdAndDelete(req.params.id);
        if (!submission) {
            return res.status(404).json({ error: 'Submission not found' });
        }
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ error: 'Failed to delete submission' });
    }
}

export { createSubmission, getAllSubmissions, getSubmissionById, updateSubmission, deleteSubmission };
