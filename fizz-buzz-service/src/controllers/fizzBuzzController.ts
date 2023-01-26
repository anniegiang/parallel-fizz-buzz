import {Request, Response} from "express";
import fizzBuzzService from "../services/fizzBuzzService";
import {UPPER_LIMIT, LOWER_LIMIT} from "../constants";

const checkFizzBuzz = async (req: Request, res: Response) => {
  const {input} = req.body;

  if (typeof input !== "number") {
    res.status(400).json({error: "Input must be a number"});
  }

  if (!fizzBuzzService.validateFizzBuzz(input)) {
    res
      .status(400)
      .json({error: `Input must be >= ${LOWER_LIMIT} and <= ${UPPER_LIMIT}`});
  }

  try {
    res.status(200).json({result: fizzBuzzService.isFizzBuzz(input)});
  } catch (err) {
    res.status(500).json({error: "Something was wrong"});
  }
};

export default {
  checkFizzBuzz,
};
