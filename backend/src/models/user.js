import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema

const userSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true
    },
    last_name: {
        type: String,
        required: false
    },
    nationality: {
        type: String,
        required: false
    },
    password: {
        type: String,
        minlength: 8,
        required: false
    }
}, {versionKey: false})

userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, 8)
    next()
})

const User = mongoose.model('User', userSchema)

export default User