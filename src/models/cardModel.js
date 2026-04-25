import mongoose from "mongoose";

const { Schema, model } = mongoose;

function cardSchema() {
  const schema = new Schema({
    status: {
      type: String,
      required: true,
    },
    edition: {
      type: String,
      required: true
    },
    language: {
      type: String,
      required: true
    },
    reviewState: {
      type: String,
      enum: ["pendiente a revisión", "aprobado", "rechazado"],
      default: "pendiente a revisión"
    },
    reason: {
      type: String,
      default: "No aplica"
    },
    idTrader: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  }, { timestamps: true })
  return model("Card", schema);
}

export const Card = cardSchema();


export async function saveCard(cardData) {
  const newCard = await Card.create(cardData)
  return newCard;
}


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