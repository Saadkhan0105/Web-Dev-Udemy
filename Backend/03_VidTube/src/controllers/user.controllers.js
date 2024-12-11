import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloduinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

// Generate access and refresh token
const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user =await User.findById(userId)
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh tokens"); 
    }

}

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;

  // validation: check if any field is empty
  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // check if user already exists
  const existedUser = await User.findOne({
    $or: [{ username }, { email }]
  });

  if (existedUser) {
    throw new ApiError(
      400,
      "User with the same email or username already exists"
    );
  }

  console.warn(req.files);
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverLocalPath = req.files?.coverImage?.[0]?.path;

  // Check if avatar image is provided
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar image is missing");
  }

  // Upload avatar to Cloudinary
  let avatar;
  try {
    avatar = await uploadOnCloudinary(avatarLocalPath);
    console.log("Avatar uploaded successfully", avatar);
  } catch (error) {
    console.log("Error uploading avatar", error);
    throw new ApiError(500, "Error uploading avatar");
  }

  // Upload cover image to Cloudinary (if exists)
  let coverImage;
  if (coverLocalPath) {
    try {
      coverImage = await uploadOnCloudinary(coverLocalPath);
      console.log("Cover image uploaded successfully", coverImage);
    } catch (error) {
      console.log("Error uploading cover image", error);
      throw new ApiError(500, "Error uploading cover image");
    }
  }

  try {
    // Create new user
    const user = await User.create({
      fullname,
      avatar: avatar.url,
      coverImage: coverImage?.url || "", // If no cover image, leave it as an empty string
      email,
      password,
      username: username.toLowerCase(),
    });

    console.log("User created successfully:", user);

    // Fetch the created user without password and refresh token
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      console.error("User creation failed after user was created");
      throw new ApiError(
        500,
        "Something went wrong while registering user. Please try again later."
      );
    }

    return res
      .status(201)
      .json(new ApiResponse(200, "User registered successfully", createdUser));
  } catch (error) {
    console.log("User creation failed");

    // Log more information about the error
    console.error("Error during user creation:", error.message);
    console.error("Stack trace:", error.stack);

    // If user creation fails, delete uploaded images from Cloudinary
    if (avatar) {
      console.log("Deleting avatar from Cloudinary:", avatar.public_id);
      try {
        await deleteFromCloudinary(avatar.public_id);
      } catch (deleteError) {
        console.error(
          "Error deleting avatar from Cloudinary:",
          deleteError.message
        );
      }
    }
    if (coverImage) {
      console.log(
        "Deleting cover image from Cloudinary:",
        coverImage.public_id
      );
      try {
        await deleteFromCloudinary(coverImage.public_id);
      } catch (deleteError) {
        console.error(
          "Error deleting cover image from Cloudinary:",
          deleteError.message
        );
      }
    }

    throw new ApiError(
      500,
      "Something went wrong while registering user, and images were deleted. Please try again later."
    );
  }
});


// Login a user
const loginUser = asyncHandler (async (req, res) => {
    // get data from body
    const { username, email, password } = req.body;

    // validation
    if (!email){
        throw new ApiError(400, "Email is required");
    }

    const user = await User.findOne({
      $or: [{ username }, { email }]
    });

    if(!user){
        throw new ApiError(404, "User not found");
    }

    // validate password

    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid){
        throw new ApiError(401, "Invalid password");
    }

    // generate token
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id)
    .select("-password -refreshToken");

    if(!loggedInUser){
        throw new ApiError(404, "User not found");
    }

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(
            200,
            { user: loggedInUser, accessToken, refreshToken },
            "User logged in successfully"
         ));
})

// Logout a user
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { 
      $set: 
      {
      refreshToken: undefined,
    } 
  },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out Successfully"));
});

// Refresh access token
const refreshAccessToken = asyncHandler (async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken ||req.body.refreshToken 

    if(!incomingRefreshToken){
        throw new ApiError(401, "Refresh token is required");
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET,            
        )
        const user = await User.findById(decodedToken?._id)

        if(!user){
            throw new ApiError(401, "Invalid Refresh Token!");
        }
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Invalid Refresh Token!");
        }

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        }

        const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshToken(user._id)

        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
            200,
            { accessToken, refreshToken: newRefreshToken },
            "Access token refreshed successfully"
         ));
    } catch (error) {
        throw new ApiError(500, "Something went wrong while refreshing access token");
    }

    
})

// Change current password
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const {oldPassword, newPassword} = req.body;

  const user = await User.findByIdAndUpdate(req.user?._id)

  const isPasswordValid = await user.isPasswordCorrect(oldPassword);

  if(!isPasswordValid){
    throw new ApiError(401, "Invalid old password");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));

})

// Get current user
const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, req.user, "Current User details fetched successfully"));
})

// Update account details
const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullname, email } = req.body;

  if(!fullname){
    throw new ApiError(400, "Fullname is required");
  }

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullname,
        email: email
      },
    },
    {new: true},
  ).select("-password -refreshToken")

  return res.status(200).json(new ApiResponse(200, user, "Account details updated successfully"));

})

// Update avatar
const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path

  if(!avatarLocalPath){
    throw new ApiError(400, "Avatar image is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath)

  if(!avatar.url){
    throw new ApiError(500, "Error uploading avatar");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url
      },
    },
    {new: true},
  ).select("-password -refreshToken")

  return res.status(200).json(new ApiResponse(200, user, "Avatar updated successfully"));

})

// Update cover image
const updateUserCoverImage = asyncHandler(async (req, res) => {
  const coverImageLocalPath = req.file?.path

  if(!coverImageLocalPath){
    throw new ApiError(400, "File is required");
  }

  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if(!coverImage.url){
    throw new ApiError(500, "Error uploading cover image");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        coverImage: coverImage.url
      },
    },
    {new: true},
  ).select("-password -refreshToken")

  return res.status(200).json(new ApiResponse(200, user, "Cover image updated successfully"));

})


// user profile
const getUserChannelProfile = asyncHandler(async (req, res) => {
  const {username} = req.params

  if(!username?.trim()){
    throw new ApiError(400, "Username is required");
  }

  const channel = await User.aggregate([
    {
      $match: {
        username: username?.toLowerCase(),
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "channel",
        as: "subscribers",
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscriber",
        as: "subscribedTo",
      },
    },
    {
      $addFields: {
        subscribersCount: {
          $size: "$subscribers",
        },
        channelsSubscribedToCount: {
          $size: "$subscribedTo",
        },
        isSubscribed: {
          $cond: {
            if: { $in: [req.user?._id, "$subscribers.subscriber"] },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        fullName: 1,
        username: 1,
        subscribersCount: 1,
        channelsSubscribedToCount: 1,
        isSubscribed: 1,
        avatar: 1,
        coverImage: 1,
        email: 1,
      },
    },
  ]);

  if(!channel?.length){
    throw new ApiError(404, "Channel not found");
  }

  return res.status(200).json(new ApiResponse(
    200, 
    channel[0], 
    "Channel profile fetched successfully"
  ));


})

// watch history
const getWatchHistory = asyncHandler(async (req, res) => {
  const user = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user?._id)
      }
    },
    {
      $lookup: {
        from: "videos",
        localField: "watchHistory",
        foreignField: "_id",
        as: "watchHistory",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "owner",
              pipeline: [
                {
                  $project: {
                    fullname: 1,
                    username: 1,
                    avatar: 1
                  }
                }
              ]
            }
          },
          {
            $addFields: {
              owner: {
                $first: "$owner"
              }
            }
          }
        ]
      }
    }
  ])

  return res.status(200).json(new ApiResponse(200, user[0].watchHistory, "Watch history fetched successfully"));
  
})



export { 
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    getWatchHistory
};
