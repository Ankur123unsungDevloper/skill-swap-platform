import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js'; // Your JWT verification middleware
import {
    sendSwapRequest,
    respondToSwapRequest,
    getSentSwapRequests,
    getReceivedSwapRequests
} from '../controllers/swap.controller.js'; // Adjust path

const router = Router();

// All swap routes should be protected
router.use(verifyJWT);

// Send a new swap request
router.route("/send").post(sendSwapRequest);

// Respond to a specific swap request (accept/reject)
router.route("/:requestId/respond").patch(respondToSwapRequest); // PATCH is suitable for partial updates

// Get requests sent by the authenticated user
router.route("/sent").get(getSentSwapRequests);

// Get requests received by the authenticated user
router.route("/received").get(getReceivedSwapRequests);


export default router;