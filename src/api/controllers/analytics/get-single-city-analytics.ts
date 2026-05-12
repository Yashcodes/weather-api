import { Request, Response, NextFunction } from "express";
import { analyticsService } from "../../../services";

export const getSingleCityAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name } = req.params;

    if(!name || !name.length) {
      return res.status(400).json({
        success: false,
        message: "City name is required",
      });
    }

    const data = await analyticsService.getSingleCityAnalytics({ city: name as string });

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
