import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asynchandler } from "../utils/asynchandler.js";
import { options } from "../contants.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating asscess and refresh token"
    );
  }
};

const registerUser = asynchandler(async (req, res) => {
  const {
    username,
    name,
    email,
    location,
    skillsOffered,
    skillsWanted,
    availability,
    profileVisibility,
    level,
    password,
  } = req.body;

  // 1. Basic Validation
  if (
    [username, email, name, password].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All required fields are missing or empty");
  }

  // 2. Check for Existing User
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    throw new ApiError(409, "User with this username or email already exists");
  }

  // Prepare skills data (assuming comma-separated strings from frontend)
  const parsedSkillsOffered = Array.isArray(skillsOffered)
    ? skillsOffered.map((item) => String(item).toLowerCase().trim())
    : [];
  const parsedSkillsWanted = Array.isArray(skillsWanted)
    ? skillsWanted.map((item) => String(item).toLowerCase().trim())
    : [];

  // 3. Create User
  const user = await User.create({
    username: username.toLowerCase(),
    name,
    email,
    location,
    skillsOffered: parsedSkillsOffered,
    skillsWanted: parsedSkillsWanted,
    availability,
    profileVisibility,
    level,
    password, // Mongoose pre-save hook should hash this
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "User registration failed after creation");
  }

  // 4. Generate Tokens & Send Response
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    createdUser._id
  );

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  res
    .status(201)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        201,
        { user: createdUser, accessToken, refreshToken },
        "User registered successfully"
      )
    );
});

const loginUser = asynchandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    throw new ApiError(401, "Username is required");
  }

  const user = await User.findOne({ username });

  if (!user) {
    throw new ApiError(401, "User doesnot exists");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Password doesnot match");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, refreshToken, accessToken },
        "User logged in succesfully"
      )
    );
});

const logoutUser = asynchandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $unset: { refreshToken: 1 } },
    { new: true }
  );

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});

export { registerUser, loginUser, logoutUser };
