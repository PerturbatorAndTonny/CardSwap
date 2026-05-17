import { saveOffer, getOffer, Offer } from '../models/offerModel.js'

import { 
  validateCardOffer, 
  validateMoneyOffer, 
  validateTargetCard, 
  validateOfferExists, 
  validatePublisherOwnership 
} from '../utils/offerValidation.js'

// oxlint-disable-next-line max-lines-per-function
export const createOffer = async (req, res) => {
  try {
    const { idCard, offerType, offeredCard, amount, currency } = req.body;
    const idOfertante = req.user.id;

    const targetCard = await validateTargetCard(idCard, idOfertante, res);
    if (!targetCard) return;

    if (offerType === "card") {
      const cardToOffer = await validateCardOffer(offeredCard, idOfferante, res);
      if (!cardToOffer) return;

    }

    if (offerType === "money") {
      const isValid = validateMoneyOffer(amount, currency, res);
      if (!isValid) return;

    } else {
      res.status(400).json({ message: "Tipo de oferta no válido" });
      return;
    }

    const offer = await saveOffer({
      idCard,
      idOfferante,
      offerType,
      offeredCard: offerType === "card" ? offeredCard : null,
      amount: offerType === "money" ? amount : null,
      currency: offerType === "money" ? currency : null,
    })

    return res.status(201).json({
      message: "Oferta creada exitosamente",
      data: offer
    })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

export const getOffers = async (req, res) => {
  try {
    const { type } = req.query
    const offers = await getOffer(type)
    return res.status(200).json(offers)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const acceptOffer = async (req, res) => {
  try {
    const { idOffer } = req.params;
    const idTrader = req.user.id;

    const offer = await validateOfferExists(idOffer, res);
    if (!offer) return;

    const targetCard = await validatePublisherOwnership(offer, idTrader, res);
    if (!targetCard) return;

    // ── 3. Aceptar esta oferta y rechazar las demás de la misma carta ──
    await Offer.updateMany(
      {
        idCard: offer.idCard,
        _id: { $ne: idOffer },
        status: "pendiente"
      },
      { status: "rechazada" }
    );

    offer.status = "aceptada";
    await offer.save();


    targetCard.status = "en_intercambio";
    await targetCard.save();

    res.status(200).json({
      message: "Oferta aceptada exitosamente",
      offer
    });

  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor", error });
  }
};
