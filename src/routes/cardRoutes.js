import { Router } from "express";
import { verifyData } from "../middlewares/verifyData.js";
import { createCardSchema, reviewCardSchema } from "../schemas/cardSchema.js";
import { createdCard, patchCardReview, deleteCard } from "../controllers/cardController.js";
import { verifyToken } from "../middlewares/verifySession.js";

const router = Router();

router.post("/card", verifyData(createCardSchema), createdCard);

router.patch("/card/:id", verifyData(reviewCardSchema), patchCardReview);

//verifyToken comprueba que se pida la identificación JWT antes de borrar algo
router.delete("/card/:id", verifyToken, deleteCard); 

export default router;