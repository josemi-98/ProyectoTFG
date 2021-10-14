import Ejercicio from "../models/ejercicio";

const ejerciciosController = {
    saveEjercicios: async (req, res) => {
        const { body } = req
        try{
            const newEjercicio = await Ejercicio.create(body)
            res
                .status(201)
                .json(newEjercicio)

        } catch (error){
            res
                .status(500)
                .json({error:error})

        }

        
    }
}

export default ejerciciosController