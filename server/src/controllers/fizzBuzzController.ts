import {Request, Response} from "express";
import fizzBuzzWorkflowService from "../services/fizzBuzzWorkflowService";
import logger from "../middleware/logger";
import fizzBuzzWorkflowConfig from "../configs/fizzBuzzWorkflow";

const Logger = new logger();
const fizzBuzzWorkflow = new fizzBuzzWorkflowService();

const compute = async (req: Request, res: Response) => {
  const {input} = req.query;
  const inputNumber = Number(input);

  if (typeof inputNumber !== "number") {
    res.status(400).json({error: "Input must be a number"});
  }

  if (!fizzBuzzWorkflow.validateInput(inputNumber)) {
    res.status(400).json({
      error: `Input must be >= ${fizzBuzzWorkflowConfig.lowerLimit} and <= ${fizzBuzzWorkflowConfig.upperLimit}`,
    });
  }

  try {
    const result = await fizzBuzzWorkflow.execute(inputNumber);
    Logger.logInfo("Success executing workflow");
    res.json({result});
  } catch (e) {
    Logger.logError("Error executing workflow", e);
    res.status(500).send({success: false});
  }
};

export default {
  compute,
};
