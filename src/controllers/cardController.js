function updateCardModel(id, reviewState, reason){ //la funcion es declarada para el modelo(simulado)
    return{
        id,
        reviewState,
        reason: reason || "No aplica",
        updatedAt: new Date().toISOString()
    };
}

function saveCard_DB(cardData){
    return {
        id: Math.floor(Math.random()*1000), //esta parte nos genera unn ID que es aleatorio y temporal
        ...cardData,
        reviewState: "Pendiente de revisión", //este esta por defecto
        createdAt: new Date().toISOString()
    };
}

//Arrow function para el controlador (como pide el proyecto)
export const patchCardReview = (req, res) => {
    const {id}= req.params;
    const {reviewState, reason} = req.body;

    try{
        const updatedCard = updateCardModel(id, reviewState, reason);

        //respondemos con 201 segun el criterio que se tenga de aceptación
        res.status(201).json(updatedCard);
    } catch(error){
        res.status(500).json({message: "Error interno del servidor"});
    }
};

export const createdCard = (req, res) =>{
    const { status, edition, language, idTrader} = req.body;

    try{ //criterio de aceptación donde se valida la existencia del trader
        const traderExist = true;

        if(!traderExist){
            return res.status(400).json({message: "Usuario No Encontrado"});
        }
        const newCard = saveCard_DB({status, edition, language, idTrader});

        res.status(201).json(newCard);
    }catch(error){
        res.status(500).json({message: "Error interno - Publicar Carta"});
    }
};