import User from '../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Ejercicio from '../models/ejercicio'
import { json } from 'express'

const userController = {
    saveUser: async (req, res) => {
        const {body} = req
        try {
            const newUser = await User.create(body)
            res
                .status(201)
                .json(newUser)
        } catch (error) {
            res 
                .status(500)
                .json({error: error})
        }
    },
    getAllUser: async (req, res) => {
        try {
            const users = await User.find()
            res
                .status(200)
                .json(users)
        } catch (error) {
            res
                .status(400)
                .json({error: error})
        }
    },
    getUsersById: async (req, res) => {
        const _id = req.params.id
        try {
            const users = await User.findOne({_id})
            res
                .status(200)
                .json(users)
        } catch (error) {
            res
                .status(400)
                .json({error: error})
        }
    },
    deleteUsersById: async (req, res) => {
        const _id = req.params.id
        try {
            const ejercicioToDelete = await Ejercicio.findOne({_id})
            
            const users = await User.findByIdAndDelete(_id)
            if(!users) {
                return res.status(404).json({
                    message: 'no existe el usuario'
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
    loginUser: async (req, res) => {
        const {name} = req.body
        const {password} = req.body

        try {
            const user = await User.findOne({name: name})
            if (!user){
                return res.status(404).json({
                    error: 'User does not exists'
                })
            }
            if (! (await bcrypt.compare(password + "", user.password))){
                return res.status(404).json({
                    error: 'Incorrect password'
                })
            }
            const token = jwt.sign({name: user.name}, process.env.SECRET_KEY, {expiresIn: '4h'})
           
            res 
                .status(200)
                .json({
                    message: 'validate user',
                    token: token
                         
            })
        } catch (error) {
            res
                .status(500)
                .json({error: error})
        }
    },
    validateToken: (req, res, next) => {
        if (! req.headers.authorization){
            return res
                    .status(401)
                    .json({error: 'Unathorized'})
        }
        try {
            const token = jwt.verify(req.headers.authorization, process.env.SECRET_KEY)
            //
            req.body.user = token.name
            console.log('token name', token.name)
            next()
        } catch (error) {
            return res
                        .status(401)
                        .json({error: 'not valid token'})
        }
    }
}

export default userController