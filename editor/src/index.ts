import express from 'express';
import path from 'path';
import { authMiddleware } from './middleware/authMiddlware';
import cookieParser from 'cookie-parser';
import { connectToDatabase } from './persistence/db';
import { postsRouter } from './routes/posts';

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser())

// unauthenticated routes
app.use('/api/posts', postsRouter)

// authenticated routes
app.use(authMiddleware);
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../ui/dist')));

// startServer function adds database connection dependency before starting the server
const startServer = async () => {
    try {
        // mongodb connection
        await connectToDatabase();
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database', error);
        process.exit(1);
    }
};

startServer();