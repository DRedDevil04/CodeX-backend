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
    let stat = "";
    await Promise.all(
      testCases.map(async (testcase) => {
        var formData = new FormData();
        const codeBlob = new Blob([code.data]);
        const blob = new Blob([testcase.input.data]);
        formData.append("files", codeBlob);
        formData.append("input", blob);
        formData.append("output", testcase.output);
        const resp = await axios.post("http://judge:3005/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(resp);
        if (resp.data.success == true && resp.data.opstatus == "accepted") {
          stat = "Accepted";
        }
        if (resp.data.success == true && resp.data.opstatus == "wrong") {
          stat = "Wrong Answer";
        }
        if (resp.data.opstatus == "compile") {
          stat = "Compilation Error";
        }
        if (resp.data.opstatus == "run") {
          stat = "Runtime Error";
        }
      })
    );
    const submissionScheme = await Submission.findByIdAndUpdate(
      submission._id,
      {
        result: stat,
      },
      { new: true }
    );
    const correctSubmissions = await Submission.find({
      problem: job.data.problem,
      user: job.data.userid,
      result:"Accepted"
    });
    if (correctSubmissions.length == 1 && submissionSchema.result=="Accepted") {
      const user = await userSchema.findByIdAndUpdate(job.data.userid, {
        $inc: { currentPoints: problem.points },
      });
    }
    console.log(submissionScheme);
  } catch (error) {
    console.log(error);
  }
  console.log("Scheduled job");
  done();
});

export { submissionQueue };
