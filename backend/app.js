import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: '*', // Replace with your frontend's actual origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true, // IMPORTANT: Allows cookies and Authorization headers to be sent
    // optionsSuccessStatus: 200 // Good practice for pre-flight requests
}));


app.use(express.json());
app.use(cookieParser());
import userRoute from './routes/user.routes.js';
import swapRoute from './routes/swap.routes.js';
import ratingRoutes from './routes/rating.routes.js';

// Routes Declaration

//user routes
app.use('/api/v1/user', userRoute);

// Swap routes
app.use('/api/v1/swap', swapRoute);

// Rating routes
app.use('/api/v1/ratings', ratingRoutes);

export {app}