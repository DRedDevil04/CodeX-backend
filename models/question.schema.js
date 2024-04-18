const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    difficulty: {
        type: Number,
        required: true
    },
    timeLimit: {
        type: Number,
        required: true
    },
    memoryLimit: {
        type: Number,
        required: true
    },
    testCases: [{
        input: String,
        output: String
    }],
    // Other relevant fields can be added here
}, {
    timestamps: true // Including timestamps for createdAt and updatedAt
});

export default mongoose.model('Question',problemSchema)
