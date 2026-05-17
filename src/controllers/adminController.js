import { User } from "../models/userModel.js";
import { saveBan, findBanByUser } from "../models/banModel.js";

export const banUser = async (req, res) => {
try {
    const { id } = req.params;
    const { reason, idAdmin } = req.body;

    const user = await User.findById(id);

        if (!user) {
        return res.status(404).json({
            message: "Usuario no encontrado",
        });
    }


    const alreadyBanned = await findBanByUser(id);

    if (alreadyBanned) {
        return res.status(400).json({
            message: "El usuario ya está baneado",
        });
    }

    // Registramos el ban en la base de datos
    const ban = await saveBan({
        idUser: id,
        idAdmin,
        reason,
    });

    return res.status(201).json({
        message: "Usuario baneado correctamente",
        ban,
    });
    } catch (error) {
        res.status(500).json({
            message: "Error interno - Banear usuario",
        });
    }
};