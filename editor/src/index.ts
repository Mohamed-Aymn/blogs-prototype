import express from 'express';
import path from 'path';
import { authMiddleware } from './middleware/authMiddlware';
import cookieParser from 'cookie-parser';
import { connectToDatabase } from './persistence/db';
import { postsRouter } from './routes/posts';
import { connectRedis } from './events/redisPubClient';
import { config } from './config';
import { createdPostApiSubscriber } from './events/subscriber/createdPostApiSubscriber';

// configuration
const app = express();
app.use(cookieParser());
const router = express.Router();

// Unauthenticated routes
router.use('/api/posts', postsRouter);
router.use('/api/config', (req, res) => {
    res.send({
        apiUrl: process.env.APP_URL,
    });
});

// Authenticated routes
router.use(authMiddleware);
router.use(express.static(path.join(__dirname, '../ui/dist')));

// server boot
const startServer = async () => {
    try {
        await connectToDatabase();
        await connectRedis(); 
        createdPostApiSubscriber();

        app.use('/editor', router);
        app.listen(config.app.port, () => {
            console.log(`Server is running on ${config.app.url}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database or Redis', error);
        process.exit(1);
    }
};

startServer();
