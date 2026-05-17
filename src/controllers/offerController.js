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

// oxlint-disable-next-line max-lines-per-function
export const confirmDelivery = async (req, res) => {
  try {
    const { idOffer } = req.params;
    const idUser = req.user.id;

    const offer = await Offer.findById(idOffer);

    if (!offer) {
      res.status(404).json({ message: "La oferta no existe" });
      return;
    }

    if (offer.status !== "aceptada") {
      res.status(400).json({ message: "La oferta no está en estado aceptada" });
      return;
    }

    const targetCard = await Card.findById(offer.idCard);

    const isPublisher = targetCard.idTrader.toString() === idUser;
    const isOfferante = offer.idOfferante.toString() === idUser;

    if (!isPublisher && !isOfferante) {
      res.status(403).json({ message: "No eres parte de este trade" });
      return;
    }

    if (isPublisher && offer.confirmation.byPublisher) {
      res.status(400).json({ message: "Ya confirmaste la entrega anteriormente" });
      return;
    }

    if (isOfferante && offer.confirmation.byOfferante) {
      res.status(400).json({ message: "Ya confirmaste la entrega anteriormente" });
      return;
    }

    if (isPublisher) offer.confirmation.byPublisher = true;
    if (isOfferante) offer.confirmation.byOfferante = true;

    if (offer.confirmation.byPublisher && offer.confirmation.byOfferante) {
      offer.status = "completada";
      targetCard.status = "intercambiado";
      await targetCard.save();
    }

    await offer.save();

    const isCompleted = offer.status === "completada";

    res.status(200).json({
      message: isCompleted
        ? "Trade completado exitosamente"
        : "Confirmación registrada, esperando al otro participante",
      offer
    });

  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor", error });
  }
};