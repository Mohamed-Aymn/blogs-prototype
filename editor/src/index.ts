import express from 'express';
import path from 'path';
import { authMiddleware } from './middleware/authMiddlware';
import cookieParser from 'cookie-parser';
import { connectToDatabase } from './persistence/db';
import { postsRouter } from './routes/posts';

// configuration
const app = express();
const port = process.env.PORT || 3000;
app.use(cookieParser())
const router = express.Router();

// Unauthenticated routes
router.use('/api/posts', postsRouter)
router.use('/api/config', (req, res) => {
    res.send({
        apiUrl: process.env.APP_URL
    });
});

// Authenticated routes
router.use(authMiddleware);
router.use(express.static(path.join(__dirname, '../ui/dist')));


// server boot
const startServer = async () => {
    try {
        await connectToDatabase();
        app.use('/editor', router);
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database', error);
        process.exit(1);
    }
};

startServer();
