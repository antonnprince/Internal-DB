import mongoose from 'mongoose'

const taskSchema = mongoose.Schema({
    
    department:{
        type:String,
        required:true
    },

    role:{
        type:String,
        requried:true
    },

    from:{
        type:String,
        required:true
    }
})

export const Task = mongoose.model('Task',taskSchema)