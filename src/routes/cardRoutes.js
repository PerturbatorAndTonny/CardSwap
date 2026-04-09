import { Router } from "express";
import { verifyData } from "../middlewares/verifyData.js";
import { reviewCardSchema } from "../schemas/cardSchema.js";
import { patchCardReview } from "../controllers/cardController.js";

const router = Router();

router.patch("/card/:id", verifyData(reviewCardSchema), patchCardReview);

export default router;