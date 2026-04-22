import { Router } from "express";

// Importamos el middleware que valida el body con Zod
import { verifyData } from "../middlewares/verifyData.js";

// Importamos el schema de validación para este endpoint
import { userEditSchema } from "../schemas/userSchema.js";

// Importamos el controlador que maneja la lógica del endpoint
import { editUser } from "../controllers/userController.js";

const router = Router();

// Flujo: verifyData valida el body → si pasa, editUser ejecuta la lógica
router.put("/user/edit/:id", verifyData(userEditSchema), editUser);

export default router;