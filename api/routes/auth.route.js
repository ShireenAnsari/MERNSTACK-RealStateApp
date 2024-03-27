import express from 'express'
import { LoginUser, Signup } from '../controllers/auth.controller.js';
// import { VerifyJwt } from '../middlewares/auth.middleware.js';
const Authrouter=express.Router();
Authrouter.route('/sign-up').post(Signup);
Authrouter.route('/Log-in').post(LoginUser)

// below methods with access tokend
export default  Authrouter