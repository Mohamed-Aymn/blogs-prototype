import express from 'express';
import path from 'path';
import { authMiddleware } from './middleware/authMiddlware';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser())
app.use(authMiddleware);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../ui/dist')));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});