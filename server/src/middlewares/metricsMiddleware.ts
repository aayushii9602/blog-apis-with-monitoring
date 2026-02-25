import { Request, Response, NextFunction } from "express";
import { requestCounter, httpRequestDuration } from "../utils/metrics";

export const metricsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = (Date.now() - start) / 1000;
    const route = req.baseUrl;
    console.log("Status code",res.statusCode)
    // total request count
    requestCounter.labels(req.method, route, res.statusCode.toString()).inc();

    // request duration
    httpRequestDuration
      .labels({
        method: req.method,
        route: route,
        status_code: res.statusCode,
      })
      .observe(duration);
  });

  next();
};
