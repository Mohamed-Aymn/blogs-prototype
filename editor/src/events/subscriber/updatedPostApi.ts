import { createPost } from '../../persistence/repositories/postRepository';
import { IPost } from '../../persistence/types/post';
import { createdPostPublisher } from '../publisher/createdPostPublisher';
import redisClient from '../redisSubClient';
import { IPostUpdatedEvent } from '../types/postUpdatedEvent';

export const updatedPostApiSubscriber = () => {
    redisClient.subscribe('updated-post-api', async (message) => {
        try {
            const newPost = JSON.parse(message) as IPost;
            await createPost(newPost);
            await createdPostPublisher(newPost as IPostUpdatedEvent);
        } catch (error) {
            console.error('Failed to update post from message:', message, error);
        }
    });
};
