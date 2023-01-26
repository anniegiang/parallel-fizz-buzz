import {FIZZ_NUMBER, UPPER_LIMIT, LOWER_LIMIT} from "../constants";

const isFizz = (input: number) => input % FIZZ_NUMBER === 0;

const validateFizz = (input: number) =>
  LOWER_LIMIT <= input && input <= UPPER_LIMIT;

export default {
  isFizz,
  validateFizz,
};
