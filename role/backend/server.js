import express, { response } from 'express'
import cors from 'cors'
import mongoose, { mongo } from 'mongoose'
import { User } from './models/UserModel.js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { Task } from './models/taskModel.js'
 import cookieParser from 'cookie-parser'

dotenv.config()
const app=express()
app.use(express.json())

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(cookieParser());


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
           
            return response.status(201).send({ message: "User created successfully"});
    } catch (error) {
        console.log(error);
        return response.status(500).send({ message: "An error occurred while creating the user" });
    }
});


app.post('/get_token', async (req, res) => {
    try {
        const { email } = req.body;
        const details = await User.findOne({ email });

        if (!details) {
            return res.status(404).send({ message: "User not found" });
        }

        const { department, role } = details;
        const user = { email, department, role };
        const accessToken = jwt.sign(user, 'secret12345');

        res.cookie('jwt', accessToken, {
            maxAge: 10000,
            httpOnly: true,
            sameSite: 'Lax', // 'Lax' for local development, 'None' for cross-site
            secure: false // Set to true if using HTTPS
        });

        return res.status(200).json(accessToken);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "An error occurred while generating the token" });
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

// SALES MANAGER API
app.get('/sales',authenticateUser('Senior Manager'), (req,res)=>{
    return res.status(200).json({message:"You have reached senior manager dashboard"})
})

// JUNIOR MANAGER API
app.get('/sales_jm',(req,res)=>{
    const {email}=req.body
    return res.status(200).json({message:`Hello Junior Manager, ${email}`})
})

// SALES MANAGER AUTH
function authenticateUser(requiredRole){
return (req,res,next)=>{
    const value = req.cookies.jwt
    jwt.verify(value, 'secret12345', (err,user)=>{
        if(err) return res.status(403).json(err)
        if(user)
            {
                if(user.role===requiredRole)
                    {
                        req.user = user
                        next()
                    }
                else
                {
                    return res.redirect('/sales_jm')
                }
            }
        })
    }
  }



app.post('/set_task', async(req,res)=>{
    
    const task = {
        data: req.body.data,
        department:req.body.department,
        sender:req.body.sender,
        receiver:req.body.receiver
    }    
    await Task.create(task)
    res.status(200).json({message:"Task updated successfully"})
})

app.post('get_task', async (req,res)=>{
    const user = {
        department:req.body.department,
        role:req.boody.role
    }
})
