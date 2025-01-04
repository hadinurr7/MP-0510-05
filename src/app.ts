import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import authRouter from "./routes/auth.router";
import eventRouter from "./routes/event.router";
import categoryRouter from "./routes/category.router";
import cityRouter from "./routes/city.router";
import userRouter from "./routes/user.router";
import transactionRouter from "./routes/transaction.router"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRouter)
app.use("/transactions",transactionRouter )


app.use("/events", eventRouter);
app.use("/categories", categoryRouter);
app.use("/cities", cityRouter);


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(400).send(err.message);
});

export default app;