import {  User } from "../models/Users.models.js";
import { asyncHandler } from "../utils/asynchandler.js";
import jwt from 'jsonwebtoken'
export const VerifyJwt=asyncHandler(async (req,res,next)=>{
   try {
    const token= req.cookies?.refreshToken || req.header("Authorization")?.replace("Bearer","");
 
    if(!token)
    {
    return res.status(401).json('Unauthorized')
    }
  const decodedToken=  jwt.verify(token,process.env.REFRESH_TOKEN_SECRET);
  const user=await User.findById(decodedToken?._id).select('-password -refreshToken')
  if(!user)
  {
     //
     return res.status(402).json({message:"Unauthorized access"})
  }
  req.user=user;
  next()
   } catch (error) {
    return res.status(401).json(error.message || 'Invalid refresh token')
   }
})
