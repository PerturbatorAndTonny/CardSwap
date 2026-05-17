import { User } from "../models/userModel.js";
import { saveBan, findBanByUser } from "../models/banModel.js";
import { getAllReports, getReportById, updateReportStatus, saveReport } from "../models/reportModel.js";

export const banUser = async (req, res) => {
try {
    const { id } = req.params;
    const { reason, idAdmin } = req.body;

    const user = await User.findById(id);

        if (!user) {
        return res.status(404).json({
            message: "Usuario no encontrado",
        });
    }


    const alreadyBanned = await findBanByUser(id);

    if (alreadyBanned) {
        return res.status(400).json({
            message: "El usuario ya está baneado",
        });
    }

    // Registramos el ban en la base de datos
    const ban = await saveBan({
        idUser: id,
        idAdmin,
        reason,
    });

    return res.status(201).json({
        message: "Usuario baneado correctamente",
        ban,
    });
    } catch (error) {
        res.status(500).json({
            message: "Error interno - Banear usuario",
        });
    }
};
// ─── HU6 - REVISAR REPORTES ───────────────────────────────────────────────────

// GET /admin/reports → lista todos los reportes
export const getReports = async (req, res) => {
try {
    const reports = await getAllReports();

    if (!reports || reports.length === 0) {
        return res.status(404).json({
            message: "No hay reportes registrados",
        });
    }

    res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({
        message: "Error interno - Listar reportes",
        });
    }
};

export const getReport = async (req, res) => {
try {
    const { id } = req.params;

    const report = await getReportById(id);

    if (!report) {
        return res.status(404).json({
            message: "Reporte no encontrado",
        });
    }

    res.status(200).json(report);
} catch (error) {
    res.status(500).json({
        message: "Error interno - Consultar reporte",
        });
    }
};

export const actionReport = async (req, res) => {
try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedReport = await updateReportStatus(id, status);

    if (!updatedReport) {
        return res.status(404).json({
            message: "Reporte no encontrado",
        });
    }

    res.status(201).json({
        message: "Acción aplicada correctamente",
        report: updatedReport,
    });
} catch (error) {
    res.status(500).json({
        message: "Error interno - Acción sobre reporte",
        });
    }
};
// POST /reports → crea un nuevo reporte
export const createReport = async (req, res) => {
  try {
    const { idReporter, idReported, reason } = req.body;

    // Verificamos que el usuario reportado existe
    const user = await User.findById(idReported);
    if (!user) {
      return res.status(404).json({ message: "Usuario reportado no encontrado" });
    }

    const report = await saveReport({ idReporter, idReported, reason });

    return res.status(201).json({
      message: "Reporte creado correctamente",
      report,
    });
  } catch (error) {
    res.status(500).json({ message: "Error interno - Crear reporte" });
  }
};