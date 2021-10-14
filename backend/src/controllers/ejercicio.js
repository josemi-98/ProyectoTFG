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
    },
    getAllEjercicios: async (req, res) => {
        console.log('name ', req.body.user)
        try {
            const ejercicios = await Ejercicios.find()
            res
                .status(200)
                .json(ejercicios)
        } catch (error) {
            res
                .status(400)
                .json({error: error})
        }
    },
    getEjerciciosById: async (req, res) => {
        const _id = req.params.id


        try {
            const ejercicios = await Ejercicios.findOne({_id})
            const permitted = ejercicios.user == req.body.user || req.body.user == 'josee'
            if (!permitted) {
                return res
                    .status(403)
                    .json({error: 'forbbiden'})
            }

            res
                .status(200)
                .json(ejercicios)
        } catch (error) {
            res
                .status(400)
                .json({error: error})
        }
    },
    getEjerciciosByUser: async (req, res) => {
        const{ user } = req.params
        const permitted = user == req.body.user || req.body.user == 'josee'

            if (!permitted){
                return res
                        .status(403)
                        .json({error: 'forbbiden'})
            }

        try {
            const ejercicios = await Ejercicios.find({user: user})

            res
                .status(200)
                .json(ejercicios)
        } catch (error) {
            res
                .status(400)
                .json({error: error})
        }
    },
    deleteEjerciciosById: async (req, res) => {
        const _id = req.params.id
        try {
            const productosToDelete = await Ejercicios.findOne({_id})
            const permitted = productosToDelete.user == req.body.user || req.body.user == 'josee'
            if (!permitted){
                return res
                            .status(403)
                            .json({error: 'forbbiden'})
            }
            const ejercicios = await Ejercicios.findByIdAndDelete(_id)
            if(!ejercicios) {
                return res.status(404).json({
                    message: 'no existe el ejercicio'
                })
            }
            res
                .status(204)
                .send()

        } catch (error) {
            res
                .status(400)
                .json({error: error})
        }
    },
    updateEjerciciosById: async (req, res) => {
        const _id = req.params.id
        const {body} = req;
        const { name, description, caracteristicas, price  } = body
        const ejerciciosToUpdate = await Ejercicios.findOne({_id})
        const permitted = ejerciciosToUpdate.user == req.body.user || req.body.user == 'josee'
        if (!permitted){
            return res
                        .status(403)
                        .json({error: 'forbbiden'})
        }
        try {
            const ejercicios = await Ejercicios.findByIdAndUpdate(
            _id,

            { name: name, description: description, caracteristicas: caracteristicas, price: price },
            {new: true});

      if (!ejercicios) {
        return res.status(404).json({
          error: 'not update ejercicio'
        })
      }
      res
        .status(200)
        .json(ejercicios)
    } catch (err) {
      res
        .status(500)
        .json({
          error: err
        })
    }
  }
}

export default ejerciciosController