import express from 'express'
import { LoginUser, Signup, google } from '../controllers/auth.controller.js';
// import { VerifyJwt } from '../middlewares/auth.middleware.js';
const Authrouter=express.Router();
Authrouter.route('/sign-up').post(Signup);
Authrouter.route('/Log-in').post(LoginUser)
Authrouter.route('/google').post(google)

// below methods with access tokend
export default  Authrouter