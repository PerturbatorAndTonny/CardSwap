import { Router } from "express";
 
// Importamos el middleware que valida el body con Zod
import { verifyData } from "../middlewares/verifyData.js";
 
// Importamos los schemas de validación
import { registerSchema } from "../schemas/registerSchema.js";
import { userEditSchema } from "../schemas/userSchema.js";
 
// Importamos los controladores
import { registerUser, editUser } from "../controllers/userController.js";
 
const router = Router();
 
// POST /api/v1/users → registrar un nuevo usuario
router.post("/users", verifyData(registerSchema), registerUser);
 
// PUT /api/v1/user/edit/:id → editar un usuario existente
router.put("/user/edit/:id", verifyData(userEditSchema), editUser);
 
export default router;