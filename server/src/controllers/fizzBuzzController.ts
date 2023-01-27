import {Request, Response} from "express";
import fizzBuzzWorkflowService from "../services/fizzBuzzWorkflowService";
import logger from "../middleware/logger";

const Logger = new logger();
const fizzBuzzWorkflow = new fizzBuzzWorkflowService();

const compute = async (req: Request, res: Response) => {
  const {input} = req.query;
  const inputNumber = Number(input);

  if (typeof inputNumber !== "number") {
    return res.status(400).json({error: "Input must be a number"});
  }

  try {
    const result = await fizzBuzzWorkflow.execute(inputNumber);
    Logger.logInfo("Success executing workflow");
    return res.json({result});
  } catch (e) {
    Logger.logError("Error executing workflow", e);
    res.status(500).send({success: false});
  }
};

export default {
  compute,
};
