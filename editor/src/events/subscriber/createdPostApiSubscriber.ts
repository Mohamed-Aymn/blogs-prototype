import { createPost } from '../../persistence/repositories/postRepository';
import { IPost } from '../../persistence/types/post';
import { createdPostPublisher } from '../publisher/createdPostPublisher';
import redisClient from '../redisSubClient';
import { IPostCreatedEvent } from '../types/postCreatedEvent';

export const createdPostApiSubscriber = () => {
    redisClient.subscribe('created-post-api', async (message) => {
        try {
            const newPost = JSON.parse(message) as IPost;
            await createPost(newPost);
            await createdPostPublisher(newPost as IPostCreatedEvent);
        } catch (error) {
            console.error('Failed to create post from message:', message, error);
        }
    });
};
;