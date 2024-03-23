import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import Userrouter from '../routes/user.route.js'
import Authrouter from '../routes/auth.route.js'
const app=express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:'16kb'}))
app.use(express.static('public'))
app.use(cookieParser())
app.use('/api/users',Userrouter)
app.use('/api/',Authrouter)
export {app}