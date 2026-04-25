import { User } from "../models/userModel.js";
import { hashPass } from "../utils/pass.js";
 
// ─── POST /users ──────────────────────────────────────────────────────────────
export const registerUser = async (req, res) => {
 
  // Obtenemos los datos del body (ya validados por el middleware verifyData)
  const { nombre, edad, pass, mail } = req.body;
 
  // Verificamos si el mail ya está registrado en la base de datos
  const mailExists = await User.findOne({ mail });
 
  // Si ya existe un usuario con ese mail, devolvemos error 400
  if (mailExists) {
    return res.status(400).json({
      message: "El mail ya está en uso",
    });
  }
 
  // Encriptamos la contraseña antes de guardarla en la base de datos
  const securePass = await hashPass(pass);
 
  // Creamos el nuevo usuario en MongoDB con los datos del body
  const newUser = await User.create({
    nombre,
    edad,
    pass: securePass,
    mail,
    description: "",
  });
 
  // Todo salió bien: devolvemos 201 con los datos del usuario creado
  // No devolvemos la contraseña por seguridad
  return res.status(201).json({
    message: "Usuario creado correctamente",
    user: {
      id: newUser._id,
      nombre: newUser.nombre,
      mail: newUser.mail,
      edad: newUser.edad,
    },
  });
};
 
// ─── PUT /user/edit/:id ───────────────────────────────────────────────────────
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