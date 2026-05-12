// oxlint-disable no-unused-vars
import { saveCard, updateReviewCard, getAllCards, getCardById, updateCard, Card } from "../models/cardModel.js"

// Arrow function para el controlador (regla del proyecto)

// GET /card → retorna todas las cartas registradas
export const getCards = async (req, res) => {
    try {
        const { type } = req.params;
        const cards = await getAllCards(type);

        // Si no hay cartas registradas, devolvemos 404
        if (!cards || cards.length === 0) {
            return res.status(404).json({ message: "No hay cartas registradas" });
        }

        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ message: "Error interno - Listar cartas" });
    }
};

// GET /card/:id → retorna una única carta por su id
export const getCard = async (req, res) => {
    try {
        const { id } = req.params;

        const card = await getCardById(id);

        // Si no encontró la carta con ese id, devolvemos 404
        if (!card) {
            return res.status(404).json({ message: "Carta no encontrada" });
        }

        res.status(200).json(card);
    } catch (error) {
        res.status(500).json({ message: "Error interno - Buscar carta" });
    }
};

// PUT /card/:id → actualiza los datos de una carta existente
export const editCard = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, edition, language } = req.body;

        const updatedCard = await updateCard(id, { status, edition, language });

        // Si no encontró la carta con ese id, devolvemos 404
        if (!updatedCard) {
            return res.status(404).json({ message: "Carta no encontrada" });
        }

        res.status(201).json(updatedCard);
    } catch (error) {
        res.status(500).json({ message: "Error interno - Actualizar carta" });
    }
};

// PATCH /card/:id → actualiza el estado de revisión de una carta
export const patchCardReview = async (req, res) => {
    const { id } = req.params;
    const { reviewState, reason } = req.body;

    try {
        const updatedCard = await updateReviewCard(id, reviewState, reason);

        res.status(201).json(updatedCard);
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// POST /card → crea una nueva carta
export const createdCard = async (req, res) => {
    try {
        const { status, edition, language, idTrader } = req.body;

        const newCard = await saveCard({  status, edition, language, idTrader });

        return res.status(201).json({
            message: "Carta Registrada",
            data: newCard
        });
    } catch (error) {
        res.status(500).json({ message: "Error interno - Crear Carta" })
    }
}

//controlador para eliminar carta
export const deleteCard = async (req, res) => {
    const { id } = req.params;
    const user = req.user;

    try {
        // Buscamos una carta primero para validar quien es el dueño
        const card = await Card.findById(id);

        if (!card) {
            return res.status(404).json({ message: "La carta NO existe" });
        }

        //valida permisos
        //aqui se compara el idTrader de la carta con el id del usuario logueado
        const isAdmin = user.role && user.role.toLowerCase() === 'admin';

        //verificamos si es dueño
        const isOwner = user.id && card.idTrader.toString() === user.id.toString();

        if (!isOwner && !isAdmin) {
            return res.status(403).json({
                message: "No tiene permisos para eliminar la publicación"
            });
        }

        //si la validación se completa, se elimina la carta
        await Card.findByIdAndDelete(id);

        //status 200 es exito (500 error)
        res.status(200).json({ message: "Publicación eliminada con exito." });

    } catch (error) {
        res.status(500).json({ message: "Error interno - Eliminar Carta" })
    }
};