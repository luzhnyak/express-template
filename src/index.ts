import express, {
  Request,
  Response,
  ErrorRequestHandler,
  NextFunction,
} from "express";

import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import usersRouter from "./routes/users.router";
import postsRouter from "./routes/posts.router";

dotenv.config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(4000);
