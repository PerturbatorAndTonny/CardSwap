import mongoose from "mongoose";
 
const { Schema, model } = mongoose;
 
f// Definición del esquema de la carta
function cardSchema() {
  const schema = new Schema({
    // Estado de la carta (ej: disponible, intercambiada)
    status: {
      type: String,
      required: true,
    },

    // Edición de la carta
    edition: {
      type: String,
      required: true
    },

    // Idioma de la carta
    language: {
      type: String,
      required: true
    },

    // Estado de revisión de la carta
    reviewState: {
      type: String,
      enum: ["pendiente a revisión", "aprobado", "rechazado"],
      default: "pendiente a revisión"
    },

    // Motivo en caso de rechazo
    reason: {
      type: String,
      default: "No aplica"
    },

    // Referencia al usuario (trader)
    idTrader: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  }, { timestamps: true })

  return model("Card", schema);
 
export const Card = cardSchema();
 

// Guarda una nueva carta en la base de datos
export async function saveCard(cardData) {
  const newCard = await Card.create(cardData)
  return newCard;
}
 
// Retorna todas las cartas registradas en la base de datos
export async function getAllCards() {
  const cards = await Card.find();
  return cards;
}
 
// Retorna una única carta buscada por su id
export async function getCardById(id) {
  const card = await Card.findById(id);
  return card;
}
 
// Actualiza los campos de una carta existente por su id
export async function updateCard(id, cardData) {
  const updatedCard = await Card.findByIdAndUpdate(
    id,
    { $set: cardData },
    { new: true }
  );
  return updatedCard;
}
 
// Actualiza el estado de revisión de una carta por su id
export async function updateReviewCard(id, reviewState, reason) {
  const updateCardReview = await Card.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        reviewState: reviewState,
        reason: reason || "No aplica",
      }
    },
    { new: true }
  )
  return updateCardReview
}