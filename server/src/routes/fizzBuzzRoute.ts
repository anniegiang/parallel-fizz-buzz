import express from "express";
const router = express.Router();
import fizzBuzzController from "../controllers/fizzBuzzController";

router.get("/compute", fizzBuzzController.compute);

export default router;
