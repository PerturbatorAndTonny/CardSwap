import { Router } from "express";
import { verifyData } from "../middlewares/verifyData.js";
import { verifyToken } from '../middlewares/verifySession.js'
import { schemaOne } from "../schemas/schemaOne.js";
import { controllerOne, controllerTwo, startSession } from "../controllers/controllerOne.js"

const router = Router();

router.get("/ping", verifyToken, controllerOne);
router.get("/ping/:id", verifyToken, controllerTwo);

router.post("/ping", verifyData(schemaOne), startSession);

export default router;