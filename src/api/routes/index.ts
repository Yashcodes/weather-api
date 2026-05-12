import { Router } from "express";
import analyticsRouter from "./analytics";

const router: Router = Router();

router.use("/analytics", analyticsRouter);

export default router;