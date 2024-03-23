import dotenv from 'dotenv'
import connectDB from './db/_connect.js'
import { app } from './src/app.js'

dotenv.config({})
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 5000,()=>{
        console.log(`Server is running at port ${process.env.PORT}`)
    }
    )
})
 