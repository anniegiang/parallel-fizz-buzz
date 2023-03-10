import {Request, Response} from "express";
import buzzService from "../services/buzzService";
import {UPPER_LIMIT, LOWER_LIMIT} from "../constants";

const checkBuzz = async (req: Request, res: Response) => {
  const {input} = req.body;

  if (typeof input !== "number") {
    return res.status(400).json({error: "Input must be a number"});
  }

  if (!buzzService.validateBuzz(input)) {
    return res
      .status(400)
      .json({error: `Input must be >= ${LOWER_LIMIT} and <= ${UPPER_LIMIT}`});
  }

  try {
    return res.status(200).json({result: buzzService.isBuzz(input)});
  } catch (err) {
    return res.status(500).json({error: "Something was wrong"});
  }
};

export default {
  checkBuzz,
};
