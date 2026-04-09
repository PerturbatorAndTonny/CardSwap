function updateCardModel(id, reviewState, reason){ //la funcion es declarada para el modelo(simulado)
    return{
        id,
        reviewState,
        reason: reason || "No aplica",
        updatedAt: new Date().toISOString()
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