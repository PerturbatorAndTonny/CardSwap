import { Router } from "express";
import { verifyData } from "../middlewares/verifyData.js";
import { createCardSchema, reviewCardSchema } from "../schemas/cardSchema.js";
import { verifyToken, verifyRole } from "../middlewares/verifySession.js";

import { createdCard, patchCardReview, getCards, getCard, editCard, deleteCard } from "../controllers/cardController.js";
 
const router = Router();
 
// POST /api/v1/card → crear una nueva carta
router.post("/card", verifyData(createCardSchema), verifyToken, verifyRole("admin"), createdCard);
 
// GET /api/v1/card → listar todas las cartas
router.get("/card", verifyToken, verifyRole("admin"), getCards);
 
// GET /api/v1/card/:id → obtener una carta por id
router.get("/card/:id", verifyToken, verifyRole("admin"), getCard);
 
// PUT /api/v1/card/:id → actualizar datos de una carta
router.put("/card/:id", verifyData(createCardSchema),verifyToken, verifyRole("admin"), editCard);
 
// PATCH /api/v1/card/:id → actualizar estado de revisión de una carta
router.patch("/card/:id", verifyData(reviewCardSchema), verifyToken, verifyRole("admin"), patchCardReview);

//verifyToken comprueba que se pida la identificación JWT antes de borrar algo
router.delete("/card/:id", verifyToken, verifyRole("admin"), deleteCard); 
 
export default router;