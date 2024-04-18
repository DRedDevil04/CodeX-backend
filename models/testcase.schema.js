import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema({
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required:true
    },
    input: {
        data: Buffer,
        contentType:String,
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

