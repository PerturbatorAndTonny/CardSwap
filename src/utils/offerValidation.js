import { getCardById } from '../models/cardModel.js'

export async function validateTargetCard(idCard, idOfertante, res) {
  const targetCard = await getCardById(idCard);

  if (!targetCard) {
    res.status(404).json({ message: "La carta publicada no existe" });
    return null;
  }

  if (targetCard.status !== "disponible") {
    res.status(400).json({ message: "La carta no está disponible para ofertas" });
    return null;
  }

  if (targetCard.reviewState !== "aprobado") {
    res.status(400).json({ message: "La carta aún no ha sido aprobada por un moderador" });
    return null;
  }

  if (targetCard.idTrader.toString() === idOfferante) {
    res.status(400).json({ message: "No puedes hacerle una oferta a tu propia publicación" });
    return null;
  }

  return targetCard;
}

export async function validateCardOffer(offeredCard, idOfferante, res) {
  const cardToOffer = await Card.findById(offeredCard);

  if (!cardToOffer) {
    res.status(404).json({ message: "La carta que ofreces no existe" });
    return null;
  }

  if (cardToOffer.idTrader.toString() !== idOfferante) {
    res.status(403).json({ message: "La carta que ofreces no te pertenece" });
    return null;
  }

  if (cardToOffer.status !== "disponible") {
    res.status(400).json({ message: "La carta que ofreces no está disponible" });
    return null;
  }

  return cardToOffer;
}

export function validateMoneyOffer (amount, currency, res) {
  if (!amount || amount <= 0) {
    res.status(400).json({ message: "Debes indicar un monto válido" });
    return false;
  }

  if (!currency) {
    res.status(400).json({ message: "Debes indicar la moneda (USD o COP)" });
    return false;
  }
  return true;
}