import Queue from "bull";
import questionSchema from "../models/question.schema.js";
import Submission from "../models/submission.schema.js";
import testcaseSchema from "../models/testcase.schema.js";
import axios from "axios";
const submissionQueue = new Queue("submissionQueue", {
  redis: {
    host: "cache",
    port: 6379,
  },
});

submissionQueue.process(async (job, done) => {
  try {
    const codeF = job.data.code;
    const buffer = new Buffer.from(codeF.data.data);
    const code = {
      ...codeF,
      data: buffer,
    };
    console.log(code);
    const submission = job.data.submission;

    const problem = await questionSchema.findOne({ id: job.data.problem });
    const testCases = await testcaseSchema.find({ question: job.data.problem });
    let flag = 0;
    await Promise.all(
      testCases.map(async (testcase) => {
        var formData = new FormData();
        const codeBlob = new Blob([code.data]);
        const blob = new Blob([testcase.input.data]);
        formData.append("files", codeBlob);
        formData.append("input", blob);
        formData.append("output", testcase.output);
        const resp = await axios.post(
          "http://judge:3005/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (resp.data.success && resp.data.opstatus !== "accepted") {
          flag = 1;
        }
      })
    );

    if (flag == 0) {
      const submissionScheme = await Submission.findByIdAndUpdate(
        submission._id,
        {
          result: "Accepted",
        },
        { new: true }
      );
      const correctSubmissions = await Submission.find({
        problem: job.data.problem,
        user: job.data.userid,
      });
      if (correctSubmissions.length == 1) {
        const user = await userSchema.findByIdAndUpdate(job.data.userid, {
          $inc: { currentPoints: problem.points },
        });
      }

      console.log(submissionScheme);
    } else {
      const submissionScheme = await Submission.findByIdAndUpdate(
        submission._id,
        {
          result: "Wrong Answer",
        },
        { new: true }
      );

      console.log(submissionScheme);
    }
  } catch (error) {
    console.log(error);
  }
  console.log("Scheduled job");
  done();
});

export { submissionQueue };
