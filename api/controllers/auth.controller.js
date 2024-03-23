import { User } from "../models/Users.models.js";
import { asyncHandler } from "../utils/asynchandler.js";
const generaterefreshTokens = async (userId) => {
    try {
      const user = await User.findById(userId);
      const refreshToken = user.generaterefreshToken();
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });
      return {  refreshToken };
    } catch (error) {
      throw new APIError(
        500,
        "Something went wrong while generating refresh and access token"
      );
    }
  };
const Signup = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    console.log("email:", email);
    if (
      [ email, username, password].some((field) => field?.trim() === "")
    ) {
        return res.status(401).json({message:'All fields are required'})
    }
    const existeduser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existeduser) {
        return res.status(409).json({message:'Username already existed'})
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
        return res.status(500).json({message:'User not created'})
    }
    return res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User registered Successfully"));
  });
  
const LoginUser = asyncHandler(
    asyncHandler(async (req, res) => {
      //req body->data
      //username or email
      //find user
      //password check
      //access and refresh token
      //send cookies
      const { email, username, password } = req.body;
      if (!username && !email) {
        return res.status(400).json('username or password is required')
      }
      const user = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (!user) {
        return res.status(404).json('User does not exist')
      }
      const isPasswordvalid = await user.isPasswordCorrect(password);
      if (!isPasswordvalid) {
        return res.status(404).json('Password is not correct')
      }
      const {  refreshToken } = await generaterefreshTokens(
        user._id
      );
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
              accessToken,
              refreshToken,
            },
            "User logged in Successfully"
          )
        );
    })
  );
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
  export {Signup,LoginUser,LogoutUser}
  