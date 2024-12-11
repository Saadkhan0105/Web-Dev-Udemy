import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create a tweet
const createTweet = asyncHandler(async (req, res) => {
  const { userId, content } = req.body;

  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user ID");
  }

  if (!content || content.trim() === "") {
    throw new ApiError(400, "Content cannot be empty");
  }

  const tweet = await Tweet.create({ userId, content, createdAt: new Date() });

  res
    .status(201)
    .json(new ApiResponse(201, "Tweet created successfully", tweet));
});

// Get tweets for a user
const getUserTweets = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user ID");
  }

  const skip = (page - 1) * limit;
  const tweets = await Tweet.find({ userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  const totalTweets = await Tweet.countDocuments({ userId });

  res.status(200).json(
    new ApiResponse(200, "Tweets retrieved successfully", {
      tweets,
      totalTweets,
      currentPage: page,
      totalPages: Math.ceil(totalTweets / limit),
    })
  );
});

// Update a tweet
const updateTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  const { content } = req.body;

  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweet ID");
  }

  if (!content || content.trim() === "") {
    throw new ApiError(400, "Content cannot be empty");
  }

  const updatedTweet = await Tweet.findByIdAndUpdate(
    tweetId,
    { content, updatedAt: new Date() },
    { new: true, runValidators: true }
  );

  if (!updatedTweet) {
    throw new ApiError(404, "Tweet not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Tweet updated successfully", updatedTweet));
});

// Delete a tweet
const deleteTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;

  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweet ID");
  }

  const deletedTweet = await Tweet.findByIdAndDelete(tweetId);

  if (!deletedTweet) {
    throw new ApiError(404, "Tweet not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Tweet deleted successfully", deletedTweet));
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
