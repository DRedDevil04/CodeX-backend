import questionSchema from '../models/question.schema.js';
import Submission from '../models/submission.schema.js';


// Create a new submission
async function createSubmission(req, res) {
    try {
        const submission = await Submission.create(req.body);
        const problem = await questionSchema.findOne({id:req.body.question}).populate(question)
        problem.testCases.map(async (testcase)=>{
            const resp=await axios.post("https://127.0.0.1:3005/upload/",{
                myFile: code,
                input: testcase.input,
                output:testcase.output
            })
            if(resp.data.success && resp.data.opstatus!=="accepted"){
                submissionScheme=await questionSchema.findByIdAndUpdate(req.params.id,{
                    result: "Wrong Answer"
                })
                res.status(200).json(submissionScheme)
            }
            
        })
        submissionScheme=await questionSchema.findByIdAndUpdate(req.params.id,{
            result: "Accepted"
        })
        return res.status(201).json(submissionScheme);
    } catch (error) {
        return res.status(500).json({ error });
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
