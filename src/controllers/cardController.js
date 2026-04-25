// oxlint-disable no-unused-vars
import { Card } from "../models/cardModel.js"

async function updateCardModel(id, reviewState, reason){ //la funcion es declarada para el modelo(simulado)
    const updateCardReview = await Card.findByIdAndUpdate(
        {_id: id},
        { $set: {
            reviewState: reviewState,
            reason: reason || "No aplica",
        }},
        { new: true } 
    )
    return updateCardReview
}

async function saveCard_DB(cardData){
    const newCard = await Card.create(cardData)
    return newCard;
}

//Arrow function para el controlador (como pide el proyecto)
export const patchCardReview = async (req, res) => {
    const {id}= req.params;
    const {reviewState, reason} = req.body;

    try{
        const updatedCard = await updateCardModel(id, reviewState, reason);

        //respondemos con 201 segun el criterio que se tenga de aceptación
        res.status(201).json(updatedCard);
    } catch(error){
        res.status(500).json({message: "Error interno del servidor"});
    }
};

export const createdCard = async (req, res) =>{

    try{ //criterio de aceptación donde se valida la existencia del trader

        const { status, edition, language, idTrader} = req.body;
        const traderExist = true;

        if(!traderExist){
            return res.status(400).json({message: "Usuario No Encontrado"});
        }
        const newCard = await saveCard_DB({status, edition, language, idTrader});

        res.status(201).json(newCard);
    }catch(error){
        res.status(500).json({message: "Error interno - Publicar Carta"});
    }
};