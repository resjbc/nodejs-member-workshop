import { Schema } from 'mongoose';
export const  memberSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    id: Number,
    position: String,
    image: String,
    role: Number,
    created: {
       type: Date,
       default: Date.now 
    },
    updated:  {
        type: Date,
        default: Date.now 
     }
})

