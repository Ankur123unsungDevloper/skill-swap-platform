import { Router } from 'express';
import { verifyJWT } from '../middleware/auth.middleware.js'; // Your JWT verification middleware
import {
    submitRating,
    getUserRatings
} from '../controller/rating.controller.js'; // Adjust path

const router = Router();

// Routes for submitting ratings (requires authentication)
router.route("/submit").post(verifyJWT, submitRating);

// Route to get ratings for a specific user (can be public or protected)
router.route("/user/:userId").get(getUserRatings);

export default router;