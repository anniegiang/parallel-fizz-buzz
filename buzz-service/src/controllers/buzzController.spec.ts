import {getMockReq, getMockRes} from "@jest-mock/express";
import buzzController from "./buzzController";
import {UPPER_LIMIT, LOWER_LIMIT, BUZZ_NUMBER} from "../constants";

const LIMIT_ERROR = `Input must be >= ${LOWER_LIMIT} and <= ${UPPER_LIMIT}`;

describe("buzzController", () => {
  describe("checkBuzz", () => {
    test("returns a 400 if the input is not a number", async () => {
      const mockReq = getMockReq({body: {input: "not a number"}});
      const {res} = getMockRes();

      await buzzController.checkBuzz(mockReq, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({error: "Input must be a number"});
    });

    test("returns a 400 if the input is less than the lower limit", async () => {
      const mockReq = getMockReq({body: {input: LOWER_LIMIT - 1}});
      const {res} = getMockRes();

      await buzzController.checkBuzz(mockReq, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({error: LIMIT_ERROR});
    });

    test("returns a 400 if the input is greater than the upper limit", async () => {
      const mockReq = getMockReq({body: {input: UPPER_LIMIT + 1}});
      const {res} = getMockRes();

      await buzzController.checkBuzz(mockReq, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({error: LIMIT_ERROR});
    });

    test("returns a 200 with a computed result for valid inputs", () => {
      [LOWER_LIMIT, UPPER_LIMIT].forEach(async (input: number) => {
        const mockReq = getMockReq({body: {input}});
        const {res} = getMockRes();

        await buzzController.checkBuzz(mockReq, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          result: input % BUZZ_NUMBER === 0,
        });
      });
    });
  });
});
