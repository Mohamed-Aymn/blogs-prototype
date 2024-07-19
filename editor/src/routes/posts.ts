import express from "express";
import { authMiddleware } from "../middleware/authMiddlware";
import { createPost } from "../persistence/repositories/postRepository";

export const postsRouter = express.Router()
postsRouter.use(express.json());

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
postsRouter.post('/', async(req, res) => {
    try {
        // Extract the data from the request body
        const data = req.body;

        // Create a new post in the database
        const newPost = await createPost(data);

        // Send the created post as the response
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Failed to create post:', error);
        res.status(500).json({ error: 'Failed to create post' });
    }
})