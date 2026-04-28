// oxlint-disable no-unused-vars
import { saveCard, updateReviewCard, getAllCards, getCardById, updateCard } from "../models/cardModel.js"

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

export const getCard = async (req, res) => {
  try {
    const { id } = req.params;
 
    const card = await getCardById(id);
 

    if (!card) {
      return res.status(404).json({ message: "Carta no encontrada" });
    }
 
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ message: "Error interno - Buscar carta" });
  }
};

export const editCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, edition, language } = req.body;
 
    const updatedCard = await updateCard(id, { status, edition, language });
 

    if (!updatedCard) {
      return res.status(404).json({ message: "Carta no encontrada" });
    }
 
    res.status(201).json(updatedCard);
  } catch (error) {
    res.status(500).json({ message: "Error interno - Actualizar carta" });
  }
};
 

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
};