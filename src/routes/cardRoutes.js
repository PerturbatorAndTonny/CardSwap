import { Router } from "express";
import { verifyData } from "../middlewares/verifyData.js";
import { createCardSchema, reviewCardSchema } from "../schemas/cardSchema.js";
import { createdCard, patchCardReview } from "../controllers/cardController.js";

const router = Router();

router.post("/card", verifyData(createCardSchema), createdCard);

router.patch("/card/:id", verifyData(reviewCardSchema), patchCardReview);

export default router;