import { ApiResponse } from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";

const healthCheck = asyncHandler(async (req, res, next) => {
    return res
    .status(200)
    .json(new ApiResponse(200, "OK!", "Health check successful."))
})

export { healthCheck }