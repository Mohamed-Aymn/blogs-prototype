import express from "express";
import { authMiddleware } from "../middleware/authMiddlware";
import { createPost, getAllPosts, getPostById } from "../persistence/repositories/postRepository";

export const postsRouter = express.Router()
postsRouter.use(express.json());

// unauthenticated routes
postsRouter.get('/', async (req, res) => {
    try {
        const posts = await getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});
postsRouter.get('/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await getPostById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error('Failed to fetch post:', error);
        res.status(500).json({ error: 'Failed to fetch post' });
    }
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

function getPostsCollection() {
    throw new Error("Function not implemented.");
}
