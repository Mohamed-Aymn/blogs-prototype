import { createPost } from '../../persistence/repositories/postRepository';
import { IPost } from '../../persistence/types/post';
import redisClient from '../redisSubClient';

export const createdPostApiSubscriber = () => {
    redisClient.subscribe('created-post-api', async (message) => {
        try {
            console.log('Received message:', message);
            const newPost = JSON.parse(message) as IPost;
            await createPost(newPost);
            console.log('New post created:', newPost);
        } catch (error) {
            console.error('Failed to create post from message:', message, error);
        }
    });
};
;