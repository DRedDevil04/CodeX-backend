import mongoose from "mongoose";

const contestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    guidelines: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    // favicon:{
    //     type:Buffer,
    //     data:String
    // },
    // logo:{
    //     type: Buffer,
    //     data:String
    // }
    // Other relevant fields can be added here
  },
  {
    timestamps: true, // Including timestamps for createdAt and updatedAt
  }
);

export default mongoose.model("Contest", contestSchema);
