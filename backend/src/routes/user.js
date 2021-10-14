import express from 'express'
import userController from '../controllers/user'

const router = express.Router()

router.post('/register', userController.saveUser)
router.get('/', userController.getAllUser)
router.get('/:id', userController.getUsersById)
router.delete('/:id', userController.deleteUsersById)
router.post('/login', userController.loginUser)


export default router