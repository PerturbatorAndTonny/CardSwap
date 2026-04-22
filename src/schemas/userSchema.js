// Importamos zod, la librería de validación que ya usa el proyecto
import * as z from "zod";

// Definimos el schema de validación para el body del PUT /user/edit/:id
// z.strictObject significa que NO acepta campos extra que no estén definidos aquí
export const userEditSchema = z.strictObject({

  // nombre debe ser string y tener al menos 1 caracter
    nombre: z.string().min(1, "El nombre es requerido"),

  // edad debe ser un número
    edad: z.number({ required_error: "La edad es requerida" }),

  // pass debe ser string y tener mínimo 8 caracteres (criterio de aceptación)
    pass: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),

  // mail debe ser string con formato de email válido
    mail: z.email("El correo no es válido"),

  // description debe ser string y tener al menos 1 caracter
    description: z.string().min(1, "La descripción es requerida"),
});
