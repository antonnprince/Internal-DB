import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const UserShema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        required:true,
    },

    department:{
        type:String,
        required:true,
    },
},

{
    timeStamps:true
}
)

export const User = mongoose.model('User',UserShema)