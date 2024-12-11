import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.models.js";
import { Subscription } from "../models/subscription.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Toggle subscription for a channel
const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  const { subscriberId } = req.body;

  if (!isValidObjectId(channelId) || !isValidObjectId(subscriberId)) {
    throw new ApiError(400, "Invalid channel or subscriber ID");
  }

  const existingSubscription = await Subscription.findOne({
    channelId,
    subscriberId,
  });

  if (existingSubscription) {
    await Subscription.deleteOne({ _id: existingSubscription._id });
    return res
      .status(200)
      .json(new ApiResponse(200, "Unsubscribed successfully", null));
  }

  const newSubscription = await Subscription.create({
    channelId,
    subscriberId,
  });

  res
    .status(201)
    .json(new ApiResponse(201, "Subscribed successfully", newSubscription));
});

// Get the subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  if (!isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid channel ID");
  }

  const subscribers = await Subscription.find({ channelId }).populate(
    "subscriberId",
    "name email"
  );

  res
    .status(200)
    .json(
      new ApiResponse(200, "Subscribers retrieved successfully", subscribers)
    );
});

// Get the list of channels to which a user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;

  if (!isValidObjectId(subscriberId)) {
    throw new ApiError(400, "Invalid subscriber ID");
  }

  const subscriptions = await Subscription.find({ subscriberId }).populate(
    "channelId",
    "name description"
  );

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Subscribed channels retrieved successfully",
        subscriptions
      )
    );
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
