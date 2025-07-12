import {
  SwapRequest,
  SWAP_REQUEST_STATUS_ENUM,
} from "../models/swapRequest.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asynchandler } from "../utils/asynchandler.js";

const sendSwapRequest = asynchandler(async (req, res) => {
  const { receiverId, skillOfferedBySender, skillWantedBySender, message } =
    req.body;
  const senderId = req.user._id;

  if (!receiverId || !skillOfferedBySender || !skillWantedBySender) {
    throw new ApiError(
      400,
      "Receiver, skill offered, and skill wanted are required."
    );
  }

  if (senderId.toString() === receiverId.toString()) {
    throw new ApiError(400, "Cannot send a swap request to yourself.");
  }

  const receiverExists = await User.findById(receiverId);
  if (!receiverExists) {
    throw new ApiError(404, "Receiver user not found.");
  }

  const existingRequest = await SwapRequest.findOne({
    sender: senderId,
    receiver: receiverId,
    status: SWAP_REQUEST_STATUS_ENUM.PENDING,
    skillOfferedBySender: skillOfferedBySender.toLowerCase(),
    skillWantedBySender: skillWantedBySender.toLowerCase(),
  });

  if (existingRequest) {
    throw new ApiError(
      409,
      "A pending swap request for these skills already exists between you and this user."
    );
  }

  const swapRequest = await SwapRequest.create({
    sender: senderId,
    receiver: receiverId,
    skillOfferedBySender: skillOfferedBySender.toLowerCase(),
    skillWantedBySender: skillWantedBySender.toLowerCase(),
    message,
    status: SWAP_REQUEST_STATUS_ENUM.PENDING,
  });

  const createdRequest = await SwapRequest.findById(swapRequest._id)
    .populate("sender", "username name email")
    .populate("receiver", "username name email");

  res
    .status(201)
    .json(
      new ApiResponse(201, createdRequest, "Swap request sent successfully.")
    );
});

// Controller to accept or reject a swap request
const respondToSwapRequest = asynchandler(async (req, res) => {
  const { requestId } = req.params;
  const { action } = req.body;
  const userId = req.user._id;

  if (!action || !["accept", "reject"].includes(action)) {
    throw new ApiError(400, "Invalid action. Must be 'accept' or 'reject'.");
  }

  const swapRequest = await SwapRequest.findById(requestId);

  if (!swapRequest) {
    throw new ApiError(404, "Swap request not found.");
  }

  if (swapRequest.receiver.toString() !== userId.toString()) {
    throw new ApiError(
      403,
      "You are not authorized to respond to this request."
    );
  }

  if (swapRequest.status !== SWAP_REQUEST_STATUS_ENUM.PENDING) {
    throw new ApiError(400, `Request already ${swapRequest.status}.`);
  }

  let newStatus;
  if (action === "accept") {
    newStatus = SWAP_REQUEST_STATUS_ENUM.ACCEPTED;
  } else {
    newStatus = SWAP_REQUEST_STATUS_ENUM.REJECTED;
  }

  swapRequest.status = newStatus;
  await swapRequest.save({ validateBeforeSave: true });

  const updatedRequest = await SwapRequest.findById(swapRequest._id)
    .populate("sender", "username name email")
    .populate("receiver", "username name email");

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedRequest,
        `Swap request ${newStatus}ed successfully.`
      )
    );
});

const getSentSwapRequests = asynchandler(async (req, res) => {
  const senderId = req.user._id;
  const requests = await SwapRequest.find({ sender: senderId })
    .populate("receiver", "username name email")
    .sort({ createdAt: -1 });

  res
    .status(200)
    .json(new ApiResponse(200, requests, "Sent swap requests fetched."));
});

const getReceivedSwapRequests = asynchandler(async (req, res) => {
  const receiverId = req.user._id;
  const requests = await SwapRequest.find({ receiver: receiverId })
    .populate("sender", "username name email")
    .sort({ createdAt: -1 });

  res
    .status(200)
    .json(new ApiResponse(200, requests, "Received swap requests fetched."));
});

export {
  sendSwapRequest,
  respondToSwapRequest,
  getSentSwapRequests,
  getReceivedSwapRequests,
};
