import express from "express";
import { PORT } from "./config";
import cors from "cors";
import eventRouter from "./routes/event.router";
import categoryRouter from "./routes/category.router";
import cityRouter from "./routes/city.router";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/events", eventRouter);
app.use("/categories", categoryRouter);
app.use("/cities", cityRouter);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    response.status(400).send(error.message);
  }
);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
