import { User } from "../models/userModel.js";
import { hashPass } from "../utils/pass.js"; // Importamos la función hashPass para encriptar la contraseña antes de guardarla

// Arrow function porque es un controlador (regla del proyecto)
export const editUser = async (req, res) => {

// Obtenemos el id del usuario desde los parámetros de la URL
const { id } = req.params;

// Obtenemos los datos del body (ya validados por el middleware verifyData)
const { nombre, edad, pass, mail, description } = req.body;

// Verificamos si el mail ya está en uso por OTRO usuario
const mailExists = await User.findOne({ mail, _id: { $ne: id } });
if (mailExists) {
    return res.status(400).json({
        message: "El mail ya está en uso por otro usuario",
    });
}

// Encriptamos la contraseña antes de guardarla en la base de datos
const securePass = await hashPass(pass);

// Buscamos el usuario por id y actualizamos sus datos
const updatedUser = await User.findByIdAndUpdate(
    id,
    { nombre, edad, pass: securePass, mail, description },
    { new: true }
);

// Si no encontró ningún usuario con ese id, devolvemos 404
if (!updatedUser) {
    return res.status(404).json({
    message: "Usuario no encontrado",
    });
}

// Todo salió bien: devolvemos 201 con los datos del usuario actualizado
// No devolvemos la contraseña por seguridad
return res.status(201).json({
    message: "Usuario actualizado correctamente",
    user: {
        id: updatedUser._id,
        nombre: updatedUser.nombre,
        mail: updatedUser.mail,
        edad: updatedUser.edad,
        description: updatedUser.description,
        },
    });
};