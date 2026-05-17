import { Router } from "express";
import { verifyData } from "../middlewares/verifyData.js";
import { verifyToken, verifyRole } from "../middlewares/verifySession.js";
import { createOffer, getOffers, acceptOffer, confirmDelivery } from "../controllers/offerController.js"

import { offerSchema } from '../schemas/offerScheme.js'

const router = Router();

router.post("/offer", verifyData(offerSchema), verifyToken, verifyRole("admin"), createOffer);

router.get("/offer", verifyToken, verifyRole("admin"), getOffers);

router.put("/offer/:idOffer/accept", verifyToken, verifyRole("admin"), acceptOffer);

router.put("/offer/:idOffer/confirm", verifyToken, verifyRole("admin"), confirmDelivery);

export default router;