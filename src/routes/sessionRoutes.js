import { Router } from "express";
import { verifyData } from "../middlewares/verifyData.js";
import { verifyToken } from '../middlewares/verifySession.js'
import { schemaOne } from "../schemas/sessionSchema.js";
import { startSession, closeSession } from "../controllers/sessionController.js"

const router = Router();

router.post("/session/start", verifyData(schemaOne), startSession);
router.delete("/session/close", verifyToken, closeSession)

export default router;