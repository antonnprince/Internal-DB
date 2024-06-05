import express, { response } from 'express'
import cors from 'cors'
import mongoose, { mongo } from 'mongoose'
import { User } from './models/UserModel.js'

const app=express()
app.use(express.json())
app.use(cors())

const PORT = 5500
const mongoURL = 'mongodb+srv://prompttest123:antonprince95@cluster0.asiy8fr.mongodb.net/employees?retryWrites=true&w=majority&appName=Cluster0'
// const mongoURL = 'mongodb+srv://prompttest123:antonprince95@cluster0.asiy8fr.mongodb.net/<database name>?retryWrites=true&w=majority&appName=Cluster0'

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
        };

        const res = await User.find({email: newUser.email})
        if(res.some(user=> user.email===newUser.email))
            return response.status(200).send({message:"User already exists, please re-check the email ID"})   
        else
        {
            const user = await User.create(newUser);
            return response.status(201).send({ message: "User created successfully", user });
        }

    } catch (error) {
        console.log(error);
        return response.status(500).send({ error: "An error occurred while creating the user" });
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
