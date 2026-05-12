import mongoose from "mongoose";

const { Schema, model } = mongoose;

function offerSchema() {
  const schema = new Schema({
    idCard: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Card"
    },
    idOfferante: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },

    offerType: {
      type: String,
      enum: ["card", "money"],
      required: true
    },

    offeredCard: {
      type: Schema.Types.ObjectId,
      ref: "Card",
      default: null
    },

    amount: {
      type: Number,
      min: 0,
      default: null
    },

    currency: {
      type: String,
      enum: ["USD", "COP"],
      default: null
    },

    status: {
      type: String,
      enum: ["pendiente", "aceptada", "rechazada", "retirada", "completada"],
      default: "pendiente"
    },

    confirmation: {
      byPublisher: { type: Boolean, default: false },
      byOfferante: { type: Boolean, default: false }
    }
  }, { timestamps: true })
  return model("Offer", schema)
}

export const Offer = offerSchema();

export async function saveOffer(offerData) {
  const newOffer = await Offer.create(offerData)
  return newOffer;
}

export async function getOffersByCard(idCard) {
  const offer = await Offer.find({ idCard })
  return offer;
}

export async function getOfferById(id) {
  const offer = await Offer.findById(id)
  return offer;
}

export async function getOfferByOfferante(idOfferante) {
  const offer = await Offer.find({ idOfferante })
  return offer;
}

export async function getOfferByOfferType(type) {
  const offer = await Offer.find({ offerType: type })
  return offer;
}

export async function getOffer(status) {
  if (status === "pendiente") {
    const offer = await Offer.find({ status: 'pendiente' })
    return offer;
  }

  if (status === "aceptada") {
    const offer = await Offer.find({ status: 'aceptada' })
    return offer;
  }

  if (status === "rechazada") {
    const offer = await Offer.find({ status: 'rechazada' })
    return offer;
  }

  if (status === "retirada") {
    const offer = await Offer.find({ status: 'retirada' })
    return offer;
  }

  if (status === "completada") {
    const offer = await Offer.find({ status: 'completada' })
    return offer;
  }

  if (status === "todos") {
    const offer = await Offer.find();
    return offer;
  }
}


