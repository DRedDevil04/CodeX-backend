import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema({
    problem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    input: {
        type: String,
        required: true
    },
    output: {
        type: String,
        required: true
    },
    // Other relevant fields can be added here
}, {
    timestamps: true // Including timestamps for createdAt and updatedAt
});

export default mongoose.model('Testcase', testCaseSchema);

