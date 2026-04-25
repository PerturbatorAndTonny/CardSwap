import mongoose from "mongoose";

const { Schema, model } = mongoose;

function cardSchema(){
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
    idTrader: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  }, { timestamps: true})
  return model("Card", schema);
}

export const Card = cardSchema();
