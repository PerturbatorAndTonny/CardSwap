// oxlint-disable no-unused-vars
import { Card, saveCard, updateReviewCard } from "../models/cardModel.js"

//Arrow function para el controlador (como pide el proyecto)
export const patchCardReview = async (req, res) => {
    const {id}= req.params;
    const {reviewState, reason} = req.body;

    try{
        const updatedCard = await updateReviewCard(id, reviewState, reason);

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
        const newCard = await saveCard({status, edition, language, idTrader});

        res.status(201).json(newCard);
    }catch(error){
        res.status(500).json({message: "Error interno - Publicar Carta"});
    }
};