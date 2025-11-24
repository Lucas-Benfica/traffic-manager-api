import "express-async-errors";
import express from "express";
import cors from "cors";
import "dotenv/config";

import { router } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
const PORT = process.env.PORT || 3333;

app.use(
  cors({
    exposedHeaders: ["Content-Disposition"],
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ message: "Hello from VPS API!" });
});

app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
