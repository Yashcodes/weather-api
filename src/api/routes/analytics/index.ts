import { Router } from "express";
import { getCitiesAnalytics, getSingleCityAnalytics } from "../../controllers";

const router: Router = Router();

router.post("/cities", getCitiesAnalytics);

router.get("/city/:name", getSingleCityAnalytics);

export default router;