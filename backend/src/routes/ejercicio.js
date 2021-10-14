import express from 'express'
import ejerciciosController from '../controllers/ejercicio'

const router = express.Router()

router.post('/', ejerciciosController.saveEjercicios)

export default router

