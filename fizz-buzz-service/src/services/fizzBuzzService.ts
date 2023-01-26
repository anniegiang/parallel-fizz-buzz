import {FIZZ_BUZZ_NUMBER, UPPER_LIMIT, LOWER_LIMIT} from "../constants";

const isFizzBuzz = (input: number) => input % FIZZ_BUZZ_NUMBER === 0;

const validateFizzBuzz = (input: number) =>
  LOWER_LIMIT <= input && input <= UPPER_LIMIT;

export default {
  isFizzBuzz,
  validateFizzBuzz,
};
