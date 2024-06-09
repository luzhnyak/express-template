import express, {
  Request,
  Response,
  ErrorRequestHandler,
  NextFunction,
} from "express";

import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.listen(4000);
