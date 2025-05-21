import type { NextFunction, Request, Response } from "express";
import { DailyLimit } from "./limits.model.ts";

class LimitStatus {
  async getLimit(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const today = new Date().toISOString().split("T")[0];

      let dailyCounter = await DailyLimit.findOne({ date: today });

      if (!dailyCounter) {
        dailyCounter = await DailyLimit.create({ date: today, count: 0 });
      }

      const ipAddress = req.ip || req.headers["x-forwarded-for"] || "unknown";
      const data = {
        dailyLimit: dailyCounter.limit,
        dailyUsage: dailyCounter.count,
        dailyRemaining: dailyCounter.limit - dailyCounter.count,
        percentageUsed:
          ((dailyCounter.count / dailyCounter.limit) * 100).toFixed(2) + "%",
        ipAddress: ipAddress,
        ipLimitPerHour: 15,
      };

      res.status(200).json({ status: "ok", payload: data });
    } catch (err) {
      next(err);
    }
  }
}

export const limitStatus = new LimitStatus();
