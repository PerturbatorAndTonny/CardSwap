import { Router } from "express";
import { verifyData } from "../middlewares/verifyData.js";

import {
    banSchema,
    reportActionSchema,
} from "../schemas/adminSchema.js";

import {
    banUser,
    getReports,
    getReport,
    actionReport,
} from "../controllers/adminController.js";

const router = Router();

router.post(
    "/admin/ban/:id",
    verifyData(banSchema),
    banUser
);

router.get(
    "/admin/reports",
    getReports
);

router.get(
    "/admin/reports/:id",
    getReport
);

router.patch(
    "/admin/reports/:id",
    verifyData(reportActionSchema),
    actionReport
);

export default router;