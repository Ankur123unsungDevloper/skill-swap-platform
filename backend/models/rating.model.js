import mongoose, { Schema } from "mongoose";

const ratingSchema = new Schema(
    {
        swapRequest: {
            type: Schema.Types.ObjectId,
            ref: "SwapRequest", // Reference to the specific swap that was accepted
            required: true,
            unique: true, // Ensure only one rating per accepted swap for simplicity, or
                         // if multiple ratings are allowed per swap (e.g. from sender and receiver)
                         // then unique: false but add a compound index on (swapRequest, rater)
        },
        rater: {
            type: Schema.Types.ObjectId,
            ref: "User", // The user who is giving the rating
            required: true,
        },
        ratedUser: {
            type: Schema.Types.ObjectId,
            ref: "User", // The user who is receiving the rating
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,  // Minimum rating (e.g., 1 star)
            max: 5,  // Maximum rating (e.g., 5 stars)
        },
        feedback: {
            type: String,
            trim: true,
            maxlength: 1000, // Optional feedback text
        },
    },
    { timestamps: true }
);

// Add a unique compound index to ensure one user rates another for a specific swap
ratingSchema.index({ swapRequest: 1, rater: 1 }, { unique: true });


export const Rating = mongoose.model("Rating", ratingSchema);