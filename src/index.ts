import express, { NextFunction, Request, Response } from "express";
import { PORT } from "./config";
import cors from "cors";
import sampleRouter from "./routes/sample.router";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/samples", sampleRouter);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    response.status(400).send(error.message);
  }
);

app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
