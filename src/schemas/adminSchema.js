import * as z from "zod";

export const banSchema = z.strictObject({
    reason: z.string().min(1, "El motivo del ban es requerido"),

    idAdmin: z.string().min(1, "El id del administrador es requerido"),
});

export const reportActionSchema = z.strictObject({
    status: z.enum(
        ["pendiente", "advertido", "eliminado", "sancionado"],
        {
        required_error: "El estado es requerido",
        }
    ),
});