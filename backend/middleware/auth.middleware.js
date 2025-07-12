import { clerkClient, getAuth } from "@clerk/clerk-sdk-node";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

// Helper function
const generateAccessAndRefreshTokens = async (userId) => {
  const user = await User.findById(userId);
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  return { accessToken, refreshToken };
};

export const requireAuth = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) throw new ApiError(401, "Unauthorized - Clerk user not found");

    const clerkUser = await clerkClient.users.getUser(userId);
    if (!clerkUser) throw new ApiError(401, "Clerk user data not found");

    // Check if user already exists in your DB
    let user = await User.findOne({ email: clerkUser.emailAddresses[0].emailAddress });

    // If not, create a new one
    if (!user) {
      user = await User.create({
        username: clerkUser.username || clerkUser.id,
        name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
        email: clerkUser.emailAddresses[0].emailAddress,
        password: process.env.DEFAULT_CLERK_USER_PASSWORD || "clerk_auth", // can be random
        profileVisibility: true,
        skillsOffered: [],
        skillsWanted: [],
        location: '',
        level: 'Beginner',
      });
    }

    // Generate custom JWTs
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    // Attach user to request
    req.user = user;

    // Optionally send tokens if you're using this middleware for login
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    // ✅ Continue
    next();
  } catch (error) {
    console.error("Clerk Auth Error:", error);
    next(new ApiError(401, error.message || "Clerk authentication failed"));
  }
};
