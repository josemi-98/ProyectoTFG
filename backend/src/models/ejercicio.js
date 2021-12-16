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
    img:
    {
        data: Buffer,
        contentType: String
    },
    imgUrl:  {
        type: String
    },
    description: {
        type: String,
        required: true,
        minlength: 5
    },

    series: {
        type: Number,
        required: false
    },
    repeticiones: {
        type: String,
        required: false
    }
}, {versionKey: false})

const Ejercicio = mongoose.model('Ejercicio', ejercicioSchema)

export default Ejercicio



