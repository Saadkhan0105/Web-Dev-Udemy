import { Router} from "express";
import { healthCheck } from "../controllers/healthCheck.controllers.js";

const router = Router();
// /api/v1/healthCheck/test

// router.route("/").get(healthCheck);
router.route("/").get(healthCheck);

export default router;