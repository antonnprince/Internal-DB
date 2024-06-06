import express, { response } from 'express'
import cors from 'cors'
import mongoose, { mongo } from 'mongoose'
import { User } from './models/UserModel.js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { Task } from './models/taskModel.js'

dotenv.config()
const app=express()
app.use(express.json())
app.use(cors())

const PORT = 5500

// const mongoURL = 'mongodb+srv://<cluster_name>:<password>@cluster0.asiy8fr.mongodb.net/<database_name>?retryWrites=true&w=majority&appName=Cluster0'
const mongoURL=process.env.MONGO_URL
app.get('/',  (req,res)=>{
    return res.status(234).send('Server')
})


mongoose.connect(mongoURL).then(()=>{
console.log("Database connected")
app.listen(PORT, ()=>{
    console.log(`App is listening at ${PORT}`)
})
}).catch((error)=>{
    console.log(error)
})


app.post('/create_user', async (request, response) => {
    try {
        const newUser = {
            email: request.body.email,
            department: request.body.department,
            role:request.body.role
        };

        
            await User.create(newUser);
            const accessToken = jwt.sign(newUser, process.env.ACCESS_TOKEN)
            return response.status(201).send({ message: "User created successfully", accessToken });
        

    } catch (error) {
        console.log(error);
        return response.status(500).send({ message: "An error occurred while creating the user" });
    }
});


app.get('/get_details/:email', async (request, response)=>{
    try {
        const {email} = request.params
        const result = await User.find({email:email})
        return response.status(200).send(result)
        }
     catch (error) {
        console.log(error)
    }
})

app.post('/set_task', async(req,res)=>{
    
})
