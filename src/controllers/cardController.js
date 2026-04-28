// oxlint-disable no-unused-vars
import { Card, saveCard, updateReviewCard } from "../models/cardModel.js"

//Arrow function para el controlador (como pide el proyecto)
export const patchCardReview = async (req, res) => {
    const { id } = req.params;
    const { reviewState, reason } = req.body;

    try {
        const updatedCard = await updateReviewCard(id, reviewState, reason);

        //respondemos con 201 segun el criterio que se tenga de aceptación
        res.status(201).json(updatedCard);
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const createdCard = async (req, res) => {

    try { //criterio de aceptación donde se valida la existencia del trader

        const { status, edition, language, idTrader } = req.body;
        const traderExist = true;

        if (!traderExist) {
            return res.status(400).json({ message: "Usuario No Encontrado" });
        }
        const newCard = await saveCard({ status, edition, language, idTrader });

        res.status(201).json(newCard);
    } catch (error) {
        res.status(500).json({ message: "Error interno - Publicar Carta" });
    }
};

//controlador para eliminar carta
export const deleteCard = async (req, res) => {
    const { id } = req.params;
    const user = req.user;

    try{
        // Buscamos una carta primero para validar quien es el dueño
        const card = await Card.findById(id);

        if(!card){
            return res.status(404).json({ message: "La carta NO existe"});
        }

        //valida permisos
        //aqui se compara el idTrader de la carta con el id del usuario logueado
        const isOwner = card.idTrader.toString() === user.id;
        
        //verifica si el usuario es administrador
        const isAdmin = user.role === 'admin';

        if(!isOwner && !isAdmin){
            return res.status(403).json({
                message: "No tiene permisos para eliminar la publicación"
            });
        }

        //si la validación se completa, se elimina la carta
        await card.findByIdAndDelete(id);
        res.status(500).json({message: "Publicación eliminada con exito."});

    }catch(error){
        console.error(error);
        res.status(500).json({message: "Error interno - Eliminar Carta"})
    }
};