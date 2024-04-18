import mongoose from "mongoose";
const submissionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    problem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    language: {
        type: String,
        required: true
    },
    code: {
        data: Buffer,
        contentType:String
    },
    result: {
        type: String,
        enum: ['Queued','Accepted', 'Wrong Answer', 'Runtime Error', 'Time Limit Exceeded', 'Memory Limit Exceeded', 'Compilation Error', 'Internal Error'],
        required: true
    },
    executionTime: {
        type: Number,
        required: true
    },
    memoryUsage: {
        type: Number,
        required: true
    },
    // Other relevant fields can be added here
},{timestamps:true});
export default mongoose.model('Submission',submissionSchema);


