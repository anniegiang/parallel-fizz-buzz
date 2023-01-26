import {getMockReq, getMockRes} from "@jest-mock/express";
import fizzController from "../controllers/fizzController";
import {UPPER_LIMIT, LOWER_LIMIT, FIZZ_NUMBER} from "../constants";

const LIMIT_ERROR = `Input must be >= ${LOWER_LIMIT} and <= ${UPPER_LIMIT}`;

describe("fizzController", () => {
  describe("checkFizz", () => {
    test("returns a 400 if the input is not a number", async () => {
      const mockReq = getMockReq({body: {input: "not a number"}});
      const {res} = getMockRes();

      await fizzController.checkFizz(mockReq, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({error: "Input must be a number"});
    });

    test("returns a 400 if the input is less than the lower limit", async () => {
      const mockReq = getMockReq({body: {input: LOWER_LIMIT - 1}});
      const {res} = getMockRes();

      await fizzController.checkFizz(mockReq, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({error: LIMIT_ERROR});
    });

    test("returns a 400 if the input is greater than the upper limit", async () => {
      const mockReq = getMockReq({body: {input: UPPER_LIMIT + 1}});
      const {res} = getMockRes();

      await fizzController.checkFizz(mockReq, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({error: LIMIT_ERROR});
    });

    test("returns a 200 with a computed result for valid inputs", () => {
      [LOWER_LIMIT, UPPER_LIMIT].forEach(async (input: number) => {
        const mockReq = getMockReq({body: {input}});
        const {res} = getMockRes();

        await fizzController.checkFizz(mockReq, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          result: input % FIZZ_NUMBER === 0,
        });
      });
    });
  });
});
