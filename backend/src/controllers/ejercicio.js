import { modelNames } from "mongoose";
import User from "../models/user";
import Ejercicio from "../models/ejercicio";

const ejerciciosController = {
    saveEjercicios: async (req, res) => {
        const { body } = req
        console.log(body)
        try{
            const newEjercicio = await Ejercicio.create(body)
            res
                .status(201)
                .json(newEjercicio)

        } catch (error){
            console.log(error)
            res
                .status(500)
                .json({error:error})
                

        } 
    },
    getAllEjercicios: async (req, res) => {
        console.log('name ', req.body.user)
       // let ejerciciosName = new RegExp(`.*${req.query.search || ''}.*`)
       const {searchBy} = req.query
       let search = (searchBy)? new RegExp(`.*${searchBy}.*`): search = new RegExp (`.*`)
      // (searchBy)? search =  new RegExp(`.*${searchBy}.*`): search = new RegExp (`.*`)
       //let search = new RegExp(`.*${searchBy}.*`)
       
        try {
            //const ejercicios = await Ejercicio.find({name:ejerciciosName})
            const ejercicios = await Ejercicio.find({name: search})
            console.log(ejercicios)
            res
                .status(200)
                .json(ejercicios)
        } catch (error) {
            res
                .status(400)
                .json({error: 'no se pueden mostrar los ejercicios'})
        }
    },
    getEjerciciosById: async (req, res) => {
        const _id = req.params.id
        try {
            const ejercicios = await Ejercicio.findOne({_id})
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
        const userName = req.body.user; 
        try {
            const ejercicios = await Ejercicio.find({user: userName})

            res
                .status(200)
                .json(ejercicios)
        } catch (error) {
            console.log(error)
            res
                .status(400)
                .json({error: error})
        }
    },
    deleteEjerciciosById: async (req, res) => {
        const _id = req.params.id
        try {
            const productosToDelete = await Ejercicio.findOne({_id})
            const permitted = productosToDelete.user == req.body.user || req.body.user == 'josee'
            console.log(permitted)
            if (!permitted){
                return res
                            .status(403)
                            .json({error: 'forbbiden'})
            }
            const ejercicios = await Ejercicio.findByIdAndDelete(_id)
            if(!ejercicios) {
                return res.status(404).json({
                    message: 'no existe el ejercicio'
                })
            }
            res
                .status(204)
                .send()

        } catch (error) {
            console.log(error)
            res
                .status(400)
                .json({error: error})
        }
    },
    updateEjerciciosById: async (req, res) => {
        const _id = req.params.id
        const {body} = req;
        const { name, description, series, repeticiones  } = body
        const ejerciciosToUpdate = await Ejercicio.findOne({_id})
        const permitted = ejerciciosToUpdate.user == req.body.user || req.body.user == 'josee'
        if (!permitted){
            return res
                        .status(403)
                        .json({error: 'forbbiden'})
        }
        try {
            const ejercicios = await Ejercicio.findByIdAndUpdate(
            _id,

            { name: name, description: description, series: series, repeticiones: repeticiones },
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