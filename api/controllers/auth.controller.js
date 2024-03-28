import { User } from "../models/Users.models.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import {APIError} from '../utils/ApiError.js'
import bcrypt from 'bcrypt'
const generaterefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const refreshToken = user.generaterefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { refreshToken };
  } catch (error) {
    throw new APIError(
      500,
      "Something went wrong while generating refresh  token"
    );
  }
};
const Signup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  console.log("email:", email);

  // Check if required fields are missing
  if ([username, password].some((field) => !field?.trim())) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (password.length <= 6) {
    return res
      .status(401)
      .json({ message: "Password must be greater then 6 digits" });
  }
  // Check if password and confirm password match
  // if (password !== confirmpassword) {
  //     throw new APIError(402, "Password and confirm password must be the same");
  // }

  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if (existingUser) {
    return res
      .status(409)
      .json({ message: "User with this username already exists" });
  }
  const user = await User.create({
    email,
    password,
    username: username.toLowerCase(),
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    return res.status(500).json({ message: "User not created" });
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

const LoginUser = asyncHandler(async (req, res) => {
  //req body->data
  //username or email
  //find user
  //password check
  //access and refresh token
  //send cookies
  const {username,password } = req.body;
  console.log("username:", username);
  if (!username || !password) {
    return res.status(405).json({message:"Username and password is required"});
  }
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(403).json({message:'User does not existed'});
  }
  const isPasswordvalid = await user.isPasswordCorrect(password);
  if (!isPasswordvalid) {
    return res.status(406).json({message:'Password is not valid'});
  }
  const { refreshToken } = await generaterefreshTokens(user._id);
  const LoggedInuser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: LoggedInuser,
          refreshToken,
        },
        "User logged in Successfully"
      )
    );
});
const google=async(req,res,next)=>{
  try {
    const user=await User.findOne({email:req.body.email})
    console.log(user)
    if(user)
    {
      const { refreshToken } = await generaterefreshTokens(user?._id);
      const LoggedInuser = await User.findById(user?._id).select(
        "-password -refreshToken"
      );
      const options = {
        httpOnly: true,
        secure: true,
      };
      return res
        .status(200)
        .cookie("refreshToken", refreshToken, options)
        .json(
          new ApiResponse(
            200,
            {
              user: LoggedInuser,
              refreshToken,
            },
            "User logged in Successfully"
          )
        );
    }
    else{
      const generatedpassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8)
      const hashedPassword=bcrypt.hashSync(generatedpassword,10);
       
      const newUser=new User({username:req.body.name.split(' ').join("").toLowerCase() + Math.random().toString(36).slice(-4),email:req.body.email,password:hashedPassword,avatar:req.body.photo})

await newUser.save()
const { refreshToken } = await generaterefreshTokens(newUser?._id);
const LoggedInuser = await User.findById(newUser?._id).select(
  "-password -refreshToken"
);
const options = {
  httpOnly: true,
  secure: true,
};

return res
.status(200)
.cookie("refreshToken", refreshToken, options)
.json(
  new ApiResponse(
    200,
    {
      user: LoggedInuser,
      refreshToken,
    },
    "User logged in Successfully"
  )
);


    }
  } catch (error) {
    next(error)
    
  }
}
const LogoutUser = asyncHandler(async (req, res) => {
  const _id = req.user._id;
  await User.findByIdAndUpdate(
    _id,
    {
      $unset: {
        refreshToken: 1, //this remove filed from the document
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Loggedout successfully"));
});
export { Signup, LoginUser, LogoutUser, google};
