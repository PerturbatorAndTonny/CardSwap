import { Router } from "express";
import { verifyData } from "../middlewares/verifyData.js";
import { createCardSchema, reviewCardSchema } from "../schemas/cardSchema.js";
import { createdCard, patchCardReview, getCards, getCard, editCard } from "../controllers/cardController.js";
 
const router = Router();
 
// POST /api/v1/card → crear una nueva carta
router.post("/card", verifyData(createCardSchema), createdCard);
 
// GET /api/v1/card → listar todas las cartas
router.get("/card", getCards);
 
// GET /api/v1/card/:id → obtener una carta por id
router.get("/card/:id", getCard);
 
// PUT /api/v1/card/:id → actualizar datos de una carta
router.put("/card/:id", verifyData(createCardSchema), editCard);
 
// PATCH /api/v1/card/:id → actualizar estado de revisión de una carta
router.patch("/card/:id", verifyData(reviewCardSchema), patchCardReview);
 
export default router;