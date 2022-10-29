import { model, Schema } from 'mongoose'

const UserSchema = new Schema({
    username: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
})

export const UserModel = model('user', UserSchema)
