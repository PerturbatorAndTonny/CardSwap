import { Router } from "express";
import { verifyData } from "../middlewares/verifyData.js";
import { verifyToken, verifyRole } from "../middlewares/verifySession.js";
import { createOffer, getOffers } from "../controllers/offerController.js"

import { offerSchema } from '../schemas/offerScheme.js'

const router = Router();

router.post("/offer", verifyData(offerSchema), verifyToken, /*verifyRole("admin"),*/ createOffer);

router.get("/offer", verifyToken, verifyRole("admin"), getOffers);

export default router;