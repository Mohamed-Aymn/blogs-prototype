import { updatePost } from '../../persistence/repositories/postRepository';
import { IPost } from '../../persistence/types/post';
import { updatedPostPublisher } from '../publisher/updatedPostPublisher';
import redisClient from '../redisSubClient';
import { IPostUpdatedEvent } from '../types/postUpdatedEvent';

export const updatedPostApiSubscriber = () => {
    redisClient.subscribe('updated-post-api', async (message) => {
        try {
            const newPost = JSON.parse(message) as IPost;
            await updatePost(String(newPost._id), newPost); 
            await updatedPostPublisher(newPost as IPostUpdatedEvent);
        } catch (error) {
            console.error('Failed to update post from message:', message, error);
        }
    });
};
