import mongoose from "mongoose";
import { Comment } from "../models/comment.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Get all comments for a video
const getVideoComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new ApiError(400, "Invalid video ID");
  }

  const skip = (page - 1) * limit;
  const comments = await Comment.find({ videoId })
    .sort({ createdAt: -1 }) // Latest comments first
    .skip(skip)
    .limit(Number(limit));

  const totalComments = await Comment.countDocuments({ videoId });

  res.status(200).json(
    new ApiResponse(200, "Comments retrieved successfully", {
      comments,
      totalComments,
      currentPage: page,
      totalPages: Math.ceil(totalComments / limit),
    })
  );
});

// Add a comment to a video
const addComment = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { userId, content } = req.body;

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new ApiError(400, "Invalid video ID");
  }

  if (!content || content.trim() === "") {
    throw new ApiError(400, "Content cannot be empty");
  }

  const newComment = await Comment.create({
    videoId,
    userId,
    content,
    createdAt: new Date(),
  });

  res
    .status(201)
    .json(new ApiResponse(201, "Comment added successfully", newComment));
});

// Update a comment
const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    throw new ApiError(400, "Invalid comment ID");
  }

  if (!content || content.trim() === "") {
    throw new ApiError(400, "Content cannot be empty");
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    { content, updatedAt: new Date() },
    { new: true, runValidators: true }
  );

  if (!updatedComment) {
    throw new ApiError(404, "Comment not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Comment updated successfully", updatedComment));
});

// Delete a comment
const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    throw new ApiError(400, "Invalid comment ID");
  }

  const deletedComment = await Comment.findByIdAndDelete(commentId);

  if (!deletedComment) {
    throw new ApiError(404, "Comment not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Comment deleted successfully", deletedComment));
});

export { getVideoComments, addComment, updateComment, deleteComment };
