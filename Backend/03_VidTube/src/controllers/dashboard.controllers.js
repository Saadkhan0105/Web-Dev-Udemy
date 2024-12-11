// Get channel stats
const getChannelStats = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(channelId)) {
    throw new ApiError(400, "Invalid channel ID");
  }

  const totalVideos = await Video.countDocuments({ channelId });
  const totalViews = await Video.aggregate([
    { $match: { channelId: mongoose.Types.ObjectId(channelId) } },
    { $group: { _id: null, totalViews: { $sum: "$views" } } },
  ]);
  const totalSubscribers = await Subscription.countDocuments({ channelId });
  const totalLikes = await Like.countDocuments({ channelId });

  res.status(200).json(
    new ApiResponse(200, "Channel stats retrieved successfully", {
      totalVideos,
      totalViews: totalViews[0]?.totalViews || 0,
      totalSubscribers,
      totalLikes,
    })
  );
});

// Get all videos for a channel
const getChannelVideos = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  if (!mongoose.Types.ObjectId.isValid(channelId)) {
    throw new ApiError(400, "Invalid channel ID");
  }

  const skip = (page - 1) * limit;
  const videos = await Video.find({ channelId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  const totalVideos = await Video.countDocuments({ channelId });

  res.status(200).json(
    new ApiResponse(200, "Videos retrieved successfully", {
      videos,
      totalVideos,
      currentPage: page,
      totalPages: Math.ceil(totalVideos / limit),
    })
  );
});

export {
  getVideoComments,
  addComment,
  updateComment,
  deleteComment,
  getChannelStats,
  getChannelVideos,
};
