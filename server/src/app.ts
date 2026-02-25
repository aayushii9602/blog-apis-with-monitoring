import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/authRoutes";
import postRoutes from "./routes/postRoutes";
import { errorHandler } from "./middlewares/errorMiddleware";
import client from "./utils/metrics";
import { metricsMiddleware } from "./middlewares/metricsMiddleware";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(metricsMiddleware);

app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
    })
);

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// health check (important for Docker)
app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.use(errorHandler);
export default app;