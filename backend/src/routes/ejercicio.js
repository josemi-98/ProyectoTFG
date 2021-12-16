import express from 'express'
import ejerciciosController from '../controllers/ejercicio'
import userController from '../controllers/user'
import upload from '../libs/storage'
//import ejerciciosController from 'module' upload.single('image')

const router = express.Router()

router.post('/',userController.validateToken, ejerciciosController.saveEjercicios)
router.get('/', ejerciciosController.getAllEjercicios)
router.get('/:id', userController.validateToken, ejerciciosController.getEjerciciosById)
router.get('/user/user', userController.validateToken, ejerciciosController.getEjerciciosByUser)
router.delete('/:id', userController.validateToken, ejerciciosController.deleteEjerciciosById)
router.put('/:id', userController.validateToken, ejerciciosController.updateEjerciciosById)

export default router

