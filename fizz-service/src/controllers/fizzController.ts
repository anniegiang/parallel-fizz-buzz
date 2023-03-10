import {Request, Response} from "express";
import fizzService from "../services/fizzService";
import {UPPER_LIMIT, LOWER_LIMIT} from "../constants";

const checkFizz = async (req: Request, res: Response) => {
  const {input} = req.body;

  if (typeof input !== "number") {
    return res.status(400).json({error: "Input must be a number"});
  }

  if (!fizzService.validateFizz(input)) {
    return res
      .status(400)
      .json({error: `Input must be >= ${LOWER_LIMIT} and <= ${UPPER_LIMIT}`});
  }

  try {
    return res.status(200).json({result: fizzService.isFizz(input)});
  } catch (err) {
    return res.status(500).json({error: "Something was wrong"});
  }
};

export default {
  checkFizz,
};
