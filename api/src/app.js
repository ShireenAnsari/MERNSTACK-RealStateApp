import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import Userrouter from '../routes/user.route.js'
import Authrouter from '../routes/auth.route.js'
import dotenv from 'dotenv'
dotenv.config()
const app=express()
const corsConfig = {
    origin: true,
    credentials: true,
  };
app.use(cors(corsConfig));
app.options('*', cors(corsConfig))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:'16kb'}))
app.use(express.static('public'))
app.use(cookieParser())
app.use('/api/users',Userrouter)
app.use('/api/auth',Authrouter)
export {app}