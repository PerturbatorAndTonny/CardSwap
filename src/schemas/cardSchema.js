import * as z from 'zod';

export const reviewCardSchema = z.strictObject({
    reviewState: z.enum(["Pendpendienteiente", "rechazado", "aprobado"], {
        errorMap: () => ({ message: "Estado no válido. Use: 'pendiente','rechazado' ó 'aprobado'"})        
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
    condition: z.enum(["nuevo", "usado", "dañado"], {
        errorMap: () => ({ message: "Condición no válida. Use: 'nuevo', 'usado' ó 'dañado'"})
    }),
    edition: z.string().min(8, "La edición debe tener minimo 8 caracteres"),
    language: z.string().min(1, "El idioma es obligatorio"),
    idTrader: z.string().min(1, "El id del trader es obligatorio").optional()
});