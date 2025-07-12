import {Router} from 'express';
import { loginUser, logoutUser, registerUser } from '../controllers/user.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

// unsecured routes
router.route('/signup').post(registerUser);
router.route("/login").post(loginUser);

// secured routes
router.route("/logout").post(verifyJWT, logoutUser);

export default router;