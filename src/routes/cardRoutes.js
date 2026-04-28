import { Router } from "express";
import { verifyData } from "../middlewares/verifyData.js";
import { createCardSchema, reviewCardSchema } from "../schemas/cardSchema.js";
import { createdCard, patchCardReview, getCards, getCard, editCard } from "../controllers/cardController.js";
 
const router = Router();
 
router.post("/card", verifyData(createCardSchema), createdCard);
 
router.get("/card", getCards);
 
router.get("/card/:id", getCard);
 
router.put("/card/:id", verifyData(createCardSchema), editCard);
 
router.patch("/card/:id", verifyData(reviewCardSchema), patchCardReview);
 
export default router;