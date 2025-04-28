import express from "express";
import cors from "cors";
import apiRouter from "./routes/api.js";
import { config } from "dotenv";

config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use("/api", apiRouter);
app.get("/api/test", (req, res) => {
  console.log("Запрос получен!"); // Проверка в логах
  res.send("API работает!");
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
