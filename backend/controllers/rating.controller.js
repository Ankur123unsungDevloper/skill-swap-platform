import { Rating } from "../models/rating.model.js";
import { SwapRequest, SWAP_REQUEST_STATUS_ENUM } from "../models/swapRequest.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asynchandler } from "../utils/asynchandler.js";
import mongoose from "mongoose"; // Needed for transactions

const submitRating = asynchandler(async (req, res) => {
    const { swapRequestId, ratedUserId, rating, feedback } = req.body;
    const raterId = req.user._id; // User giving the rating (authenticated user)

    if (!swapRequestId || !ratedUserId || rating === undefined) {
        throw new ApiError(400, "Swap Request ID, Rated User ID, and Rating are required.");
    }

    if (rating < 1 || rating > 5) {
        throw new ApiError(400, "Rating must be between 1 and 5.");
    }

    // 1. Fetch the Swap Request
    const swapRequest = await SwapRequest.findById(swapRequestId);

    if (!swapRequest) {
        throw new ApiError(404, "Swap request not found.");
    }

    // 2. Validate Swap Request Status (must be accepted)
    if (swapRequest.status !== SWAP_REQUEST_STATUS_ENUM.ACCEPTED) {
        throw new ApiError(400, "Cannot rate a swap request that is not accepted.");
    }

    // 3. Determine rater and ratedUser relationship
    let isRaterSender = raterId.toString() === swapRequest.sender.toString();
    let isRaterReceiver = raterId.toString() === swapRequest.receiver.toString();

    // Ensure the rater is one of the participants in the accepted swap
    if (!isRaterSender && !isRaterReceiver) {
        throw new ApiError(403, "You can only rate participants of an accepted swap you were part of.");
    }

    // Ensure the ratedUser is the *other* participant in the swap
    const expectedRatedUserId = isRaterSender ? swapRequest.receiver.toString() : swapRequest.sender.toString();
    if (ratedUserId.toString() !== expectedRatedUserId) {
        throw new ApiError(400, "The user you are trying to rate is not the other participant in this accepted swap.");
    }

    // Ensure user doesn't rate themselves
    if (raterId.toString() === ratedUserId.toString()) {
        throw new ApiError(400, "You cannot rate yourself.");
    }

    // 4. Check if rating already exists for this rater on this swap
    const existingRating = await Rating.findOne({
        swapRequest: swapRequestId,
        rater: raterId,
        ratedUser: ratedUserId, // Good to specify to ensure correct context
    });

    if (existingRating) {
        throw new ApiError(409, "You have already submitted a rating for this accepted swap.");
    }

    // 5. Create the new rating
    const newRating = await Rating.create({
        swapRequest: swapRequestId,
        rater: raterId,
        ratedUser: ratedUserId,
        rating,
        feedback,
    });

    // --- Update the rated user's average rating (using transaction for consistency) ---
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const userToUpdate = await User.findById(ratedUserId).session(session);

        if (!userToUpdate) {
            throw new ApiError(404, "User being rated not found.");
        }

        const currentTotalScore = userToUpdate.averageRating * userToUpdate.totalRatings;
        userToUpdate.totalRatings += 1;
        userToUpdate.averageRating = (currentTotalScore + rating) / userToUpdate.totalRatings;

        await userToUpdate.save({ session, validateBeforeSave: false }); // Validate true if you want to run pre-save hooks

        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        console.error("Error updating user's average rating:", error);
        throw new ApiError(500, "Failed to update user's average rating. Please try again.");
    } finally {
        session.endSession();
    }

    res.status(201).json(
        new ApiResponse(201, newRating, "Rating submitted successfully.")
    );
});

// Optional: Get all ratings for a specific user (to display on their profile)
const getUserRatings = asynchandler(async (req, res) => {
    const { userId } = req.params;

    const userRatings = await Rating.find({ ratedUser: userId })
        .populate("rater", "username name") // Show who gave the rating
        .populate("swapRequest", "skillOfferedBySender skillWantedBySender") // Show context of the swap
        .sort({ createdAt: -1 });

    res.status(200).json(
        new ApiResponse(200, userRatings, "User ratings fetched successfully.")
    );
});

export {
    submitRating,
    getUserRatings
};