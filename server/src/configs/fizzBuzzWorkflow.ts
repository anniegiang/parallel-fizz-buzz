import dotenv from "dotenv";
dotenv.config();

const PROJECT_NAME = process.env.PROJECT_NAME || "parallel-fizzbuzz";
const LOCATION = process.env.LOCATION || "us-west2";
const WORKFLOW = process.env.WORKFLOW || "fizzbuzz-workflow";

export default {
  projectName: PROJECT_NAME,
  location: LOCATION,
  workflow: WORKFLOW,
  lowerLimit: 1,
  upperLimit: 10000,
};
