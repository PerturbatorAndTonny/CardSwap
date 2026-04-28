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
            },


            //implementacion del campo role como un enum en MongoDB
            role: {
                type: String,      //el rol debe ser de tipo String
                enum:["admin", "moderador", "usuario"],
                default: "usuario"
            }, description: {type: String, default: ""} //define el usuario de tipo default 'usuario'
        },

        { timestamps: true } // agrega createdAt y updatedAt automáticamente
    );
    // Retornamos el modelo con el nombre "User"
    return model("User", schema);
}
// Exportamos el modelo para usarlo en el controlador
export const User = userSchema();