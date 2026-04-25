import * as z from "zod";
 
// Schema de validación para el body del POST /users
export const registerSchema = z.strictObject({
 
  // nombre debe ser string y tener al menos 1 caracter
  nombre: z.string().min(1, "El nombre es requerido"),
 
  // edad debe ser un número
  edad: z.number({ required_error: "La edad es requerida" }),
 
  // pass debe ser string y tener mínimo 8 caracteres (criterio de aceptación)
  pass: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
 
  // mail debe ser string con formato de email válido y es único en el sistema
  mail: z.email("El correo no es válido"),
});