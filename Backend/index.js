import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from './routes/main.js';
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT"],
    credentials: true,
  })
);

app.use(express.json());
app.use(router)

app.use(express.static(path.join(__dirname, '../Frontend/dist')));

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use((req, res, next) => {
  if (req.path.startsWith("/mail")) return next();
  res.sendFile(path.join(__dirname, '../Frontend/dist/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

