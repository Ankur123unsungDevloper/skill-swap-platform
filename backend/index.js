import { app } from './app.js';
import dotenv from 'dotenv';
import connectDB from './db/db.js';

dotenv.config()

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, ()=>{
    console.log(`App Listening on port http://localhost:${PORT}`)
})