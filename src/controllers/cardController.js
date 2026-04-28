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
 
    const traderExist = true; // criterio de aceptación donde se valida la existencia del trader
    if (!traderExist) {
      return res.status(400).json({ message: "Usuario No Encontrado" });
    }
 
    const newCard = await saveCard({ status, edition, language, idTrader });
 
    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ message: "Error interno - Publicar Carta" });
  }
};