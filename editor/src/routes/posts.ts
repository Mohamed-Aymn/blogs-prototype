import express from "express";
import { authMiddleware } from "../middleware/authMiddlware";

export const postsRouter = express.Router()

// unauthenticated routes
postsRouter.get('/', (req, res) => {
    res.send('posts');
})
postsRouter.get('/:id', (req, res) => {
    const postId = req.params.id;
    res.send(`Post ID: ${postId}`);
});

// authenticated routes
postsRouter.use(authMiddleware);
postsRouter.post('/', (req, res) => {
    const data = req.body;
    res.send(data)
})