import { deletePost } from '../../persistence/repositories/postRepository';
import redisClient from '../redisSubClient';

export const deletedPostApiSubscriber = () => {
    redisClient.subscribe('deleted-post-api', async (message) => {
        try {
            await deletePost(message);
        } catch (error) {
            console.error('Failed to update post from message:', message, error);
        }
    });
};
