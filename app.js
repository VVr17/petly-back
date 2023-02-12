import express from "express";
import logger from "morgan";
import cors from "cors";

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.get("/", (_, res) => {
  res.send(`API is running`);
});

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use((_, res) => {
  res.status(404).json("Use api on route not found");
});

app.use((err, req, res, next) => {
  res.status(500).json("Internal Server Error");
});

export default app;
