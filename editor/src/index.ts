import express from 'express';
import path from 'path';
import { authMiddleware } from './middleware/authMiddlware';
import cookieParser from 'cookie-parser';
import { connectToDatabase } from './persistence/db';
import { postsRouter } from './routes/posts';
import { connectRedisPub } from './events/redisPubClient';
import { connectRedisSub } from './events/redisSubClient';
import { config } from './config';
import { createdPostApiSubscriber } from './events/subscriber/createdPostApiSubscriber';
import { updatedPostApiSubscriber } from './events/subscriber/updatedPostApi';

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
        await connectRedisSub(); 
        await connectRedisPub(); 
        createdPostApiSubscriber();
        updatedPostApiSubscriber();
        

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
