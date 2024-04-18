import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique:true,
        required: true
    },
    email: {
        type: String,
        unique:true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    submissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Submission'
    }],
    currentPoints: {
        type: Number,
        default: 0
    }
    // Other relevant fields can be added here
}, {
    timestamps: true // Including timestamps for createdAt and updatedAt
});

export default mongoose.model('User',userSchema);
