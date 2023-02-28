import express from "express";
import logger from "morgan";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };
import {
  authRouter,
  noticesRouter,
  newsRouter,
  servicesRouter,
  petsRouter,
} from "./src/routes/index.js";

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(express.static("public"));
app.use("/api/auth", authRouter);
app.use("/api/notices", noticesRouter);
app.use("/api/news", newsRouter);
app.use("/api/services", servicesRouter);
app.use("/api/pets", petsRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((_, res) => {
  res.status(404).json({ message: "No api for entered route found" });
});

app.use((err, req, res, next) => {
  if (err.status) {
    const { status, message } = err;
    return res.status(status).json({ message });
  }

  if (err.name === "ValidationError") {
    const { message } = err;
    return res.status(400).json({ message });
  }

  res.status(500).json({ message: "Internal Server Error" });
});

export default app;
