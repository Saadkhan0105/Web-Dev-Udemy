import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.models.js";
import { Video } from "../models/video.models.js";
import { Comment } from "../models/comment.models.js";
import { Tweet } from "../models/tweet.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Toggle like on a video
const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { userId } = req.body;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video ID");
  }

  const like = await Like.findOne({ userId, videoId });

  if (like) {
    await like.deleteOne();
    res
      .status(200)
      .json(new ApiResponse(200, "Video like removed successfully"));
  } else {
    await Like.create({ userId, videoId, createdAt: new Date() });
    res.status(200).json(new ApiResponse(200, "Video liked successfully"));
  }
});

// Toggle like on a comment
const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { userId } = req.body;

  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid comment ID");
  }

  const like = await Like.findOne({ userId, commentId });

  if (like) {
    await like.deleteOne();
    res
      .status(200)
      .json(new ApiResponse(200, "Comment like removed successfully"));
  } else {
    await Like.create({ userId, commentId, createdAt: new Date() });
    res.status(200).json(new ApiResponse(200, "Comment liked successfully"));
  }
});

// Toggle like on a tweet
const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  const { userId } = req.body;

  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweet ID");
  }

  const like = await Like.findOne({ userId, tweetId });

  if (like) {
    await like.deleteOne();
    res
      .status(200)
      .json(new ApiResponse(200, "Tweet like removed successfully"));
  } else {
    await Like.create({ userId, tweetId, createdAt: new Date() });
    res.status(200).json(new ApiResponse(200, "Tweet liked successfully"));
  }
});

// Get all liked videos for a user
const getLikedVideos = asyncHandler(async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }

  const likes = await Like.find({
    userId,
    videoId: { $exists: true },
  }).populate("videoId");

  const likedVideos = likes.map((like) => like.videoId);

  res
    .status(200)
    .json(
      new ApiResponse(200, "Liked videos retrieved successfully", likedVideos)
    );
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
