import {BUZZ_NUMBER, UPPER_LIMIT, LOWER_LIMIT} from "../constants";

const isBuzz = (input: number) => input % BUZZ_NUMBER === 0;

const validateBuzz = (input: number) =>
  LOWER_LIMIT <= input && input <= UPPER_LIMIT;

export default {
  isBuzz,
  validateBuzz,
};
