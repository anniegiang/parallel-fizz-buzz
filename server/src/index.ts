import express from "express";
import cors from "cors";
import FizzBuzzRouter from "./routes/fizzBuzzRoute";

const PORT = process.env.PORT;

const app = express();
app.use(cors());

app.use("/api/fizz-buzz", FizzBuzzRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
