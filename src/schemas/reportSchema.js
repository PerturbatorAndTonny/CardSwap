import * as z from "zod";

export const reportSchema = z.strictObject({

    idReporter: z.string().min(1, "El id del reportante es requerido"),

    idReported: z.string().min(1, "El id del reportado es requerido"),

    reason: z.string().min(1, "El motivo del reporte es requerido"),
});
