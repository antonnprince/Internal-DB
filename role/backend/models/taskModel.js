import mongoose from 'mongoose'

const taskSchema = mongoose.Schema({
   
    department:{
        type:String,
        required:true
    },

    data:{
        type:String,
        requried:true
    },

    sender:{
        type:String,
        required:true
    },

    receiver:{
        type:String,
        requried:true
    },

   
})

export const Task = mongoose.model('Task',taskSchema)