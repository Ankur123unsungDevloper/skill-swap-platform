import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js'; // Your JWT verification middleware
import {
    submitRating,
    getUserRatings
} from '../controllers/rating.controller.js'; // Adjust path

const router = Router();

// Routes for submitting ratings (requires authentication)
router.route("/submit").post(verifyJWT, submitRating);

// Route to get ratings for a specific user (can be public or protected)
router.route("/user/:userId").get(getUserRatings);

export default router;