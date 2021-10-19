import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ejercicioSchema = new Schema({
    user: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true,
        minlength: 5
    },
    description: {
        type: String,
        required: true,
        minlength: 5
    },

<<<<<<< HEAD
    series: {
        type: Number,
        required: false
    },
    repeticiones: {
=======
    price: {
>>>>>>> backend
        type: Number,
        required: false
    }
}, {versionKey: false})

const Ejercicio = mongoose.model('Ejercicio', ejercicioSchema)

export default Ejercicio