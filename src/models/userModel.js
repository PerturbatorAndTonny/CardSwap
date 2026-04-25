import mongoose from "mongoose";

// Extrae Schema y model desde mongoose
const { Schema, model } = mongoose;

// Función que define el esquema del usuario
function userSchema(){
    const schema = new Schema(
        {
            // Campo nombre
            nombre: {
                type: String,
                required: true,
                trim: true, // elimina espacios al inicio y al final
            },
            // Campo edad
            edad: {
                type: String,
                required: true,
            },
            // Campo contraseña
            pass: {
                type: String,
                required: true,
            },
            // Campo correo electrónico
            mail: {
                type: String,
                required: true,
                unique: true, // no puede haber dos usuarios con el mismo mail
                trim: true, // convierte el mail a minúsculas automáticamente
            }
        },
        { timestamps: true } // agrega createdAt y updatedAt automáticamente
    );
    // Retornamos el modelo con el nombre "User"
    return model("User", schema);
}
// Exportamos el modelo para usarlo en el controlador
export const User = userSchema();