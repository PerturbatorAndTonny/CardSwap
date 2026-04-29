// oxlint-disable no-unused-vars
import { saveCard, updateReviewCard, getAllCards, getCardById, updateCard } from "../models/cardModel.js"

// Arrow function para el controlador (regla del proyecto)

// GET /card → retorna todas las cartas registradas
export const getCards = async (req, res) => {
    try {
        const cards = await getAllCards();

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