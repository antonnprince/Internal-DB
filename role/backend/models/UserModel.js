import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const UserShema = mongoose.Schema({

    email:{
        type:String,
        required:true,
    },

    department:{
        type:String,
        required:true,
    },

    role:{
        type:String,
        required:true
    }
},

{
    timeStamps:true
}
)

export const User = mongoose.model('User',UserShema)