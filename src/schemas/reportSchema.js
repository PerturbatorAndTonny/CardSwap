import * as z from "zod";
 
// Validación para crear un reporte
export const reportSchema = z.strictObject({
  // Id del usuario que reporta
  idReporter: z.string().min(1, "El id del reportante es requerido"),
  // Id del usuario reportado
  idReported: z.string().min(1, "El id del reportado es requerido"),
  // Motivo del reporte
  reason: z.string().min(1, "El motivo del reporte es requerido"),
});
 