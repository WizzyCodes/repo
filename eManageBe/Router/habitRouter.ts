import { Router } from "express";
import { createHabit } from "../controller/eventController";

const router: any = Router();
router.route("/create").post(createHabit);

export default router;
