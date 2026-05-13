import { saveOffer, getOffer } from '../models/offerModel.js'

import { validateCardOffer, validateMoneyOffer, validateTargetCard } from '../utils/offerValidation.js'

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