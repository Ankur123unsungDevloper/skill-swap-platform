import mongoose, { Schema } from "mongoose";

const SWAP_REQUEST_STATUS = {
    PENDING: "pending",
    ACCEPTED: "accepted",
    REJECTED: "rejected",
};

const swapRequestSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiver: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        skillOfferedBySender: {
            type: String,
            required: true,
        },
        skillWantedBySender: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(SWAP_REQUEST_STATUS),
            default: SWAP_REQUEST_STATUS.PENDING,
            required: true,
        },
        message: {
            type: String,
            trim: true,
            maxlength: 500,
        },
    },
    { timestamps: true }
);

export const SwapRequest = mongoose.model("SwapRequest", swapRequestSchema);
export const SWAP_REQUEST_STATUS_ENUM = SWAP_REQUEST_STATUS;