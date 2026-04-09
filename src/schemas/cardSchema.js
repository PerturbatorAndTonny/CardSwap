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