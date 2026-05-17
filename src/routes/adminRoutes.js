import { Router } from "express";
import { verifyData } from "../middlewares/verifyData.js";
 
import { banSchema, reportActionSchema } from "../schemas/adminSchema.js";
import { reportSchema } from "../schemas/reportSchema.js";
 
import { banUser, getReports, getReport, actionReport, createReport } from "../controllers/adminController.js";
 
const router = Router();
 
// POST /api/v1/reports → crear un reporte
router.post("/reports", verifyData(reportSchema), createReport);
 
// POST /api/v1/admin/ban/:id → banear usuario
router.post("/admin/ban/:id", verifyData(banSchema), banUser);
 
// GET /api/v1/admin/reports → listar todos los reportes
router.get("/admin/reports", getReports);
 
// GET /api/v1/admin/reports/:id → consultar detalle de un reporte
router.get("/admin/reports/:id", getReport);
 
// PATCH /api/v1/admin/reports/:id → tomar acción sobre un reporte
router.patch("/admin/reports/:id", verifyData(reportActionSchema), actionReport);
 
export default router;