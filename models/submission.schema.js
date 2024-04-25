import mongoose from "mongoose";
const submissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    language: {
      type: String,
      required: true,
      default: "CPP",
    },
    code: {
      data: Buffer,
      contentType: String,
    },
    result: {
      type: String,
      enum: [
        "Queued",
        "Accepted",
        "Wrong Answer",
        "Runtime Error",
        "Time Limit Exceeded",
        "Memory Limit Exceeded",
        "Compilation Error",
        "Internal Error",
      ],
      required: true,
      default: "Queued",
    },
    executionTime: {
      type: Number,
      required: true,
      default: 0,
    },
    memoryUsage: {
      type: Number,
      required: true,
      default: 0,
    },
    // Other relevant fields can be added here
  },
  { timestamps: true }
);
export default mongoose.model("Submission", submissionSchema);
