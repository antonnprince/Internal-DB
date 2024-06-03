import express from 'express'
import cors from 'cors'
import mongoose, { mongo } from 'mongoose'
import { User } from './models/UserModel.js'

const app=express()
app.use(express.json())
app.use(cors())

const PORT = 5500
const mongoURL = 'mongodb+srv://prompttest123:antonprince95@cluster0.asiy8fr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

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
            name: request.body.name,
            email: request.body.email,
            department: request.body.department,
        };

        const user = await User.create(newUser);

        return response.status(201).send({ message: "User created successfully", user });

    } catch (error) {
        console.log(error);
        return response.status(500).send({ error: "An error occurred while creating the user" });
    }
});
