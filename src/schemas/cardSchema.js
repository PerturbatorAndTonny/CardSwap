import * as z from 'zod';

export const reviewCardSchema = z.strictObject({
    reviewState: z.enum(["Pendiente para revisión", "rechazado", "aprobado"], {
        errorMap: () => ({ message: "Estado no válido. Use: 'pendiente a revisión','rechazado' ó 'aprobado'"})        
    }),
    reason: z.string().optional()
}).refine((data)=>{
    //si es rezachado, el campo de REASON NO puede estar vacio
    if (data.reviewState === 'rechazado' && !data.reason) return false;
    return true;
},{
    message: "La razón es obligatoria cuando el estado es 'Rechazado'",
    path: ["reason"]
});

export const createCardSchema = z.strictObject({
    status: z.number({
        requiredError: "El estado esta siendo requerido",
        invalidTypeError: "El estado debe ser numerico"
    }),
    edition: z.string().min(8, "La edicionn debe tener minimo 8 caracteres"),
    language: z.string().min(1, "El idioma es obligatorio"),
    idTrader: z.string().min(1, "El id del trader es obligatorio")
});