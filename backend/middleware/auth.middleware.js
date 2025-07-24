import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

// Helper function to verify JWT
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
};

export const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new ApiError(401, "No token provided. Unauthorized.");
    }

    const decoded = verifyToken(token);

    if (!decoded || !decoded.userId) {
      throw new ApiError(401, "Invalid token. Unauthorized.");
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new ApiError(401, "User not found. Unauthorized.");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    next(new ApiError(401, error.message || "Authentication failed"));
  }
};
