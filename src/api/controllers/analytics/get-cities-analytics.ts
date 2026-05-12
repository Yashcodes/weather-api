import { Request, Response, NextFunction } from "express";
import { analyticsService } from "../../../services";

export const getCitiesAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { cities } = req.body;

    if (!cities || !Array.isArray(cities)) {
      return res.status(400).json({
        success: false,
        message: "Cities array is required",
      });
    }

    const data = await analyticsService.getCitiesAnalytics({ cities });

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
