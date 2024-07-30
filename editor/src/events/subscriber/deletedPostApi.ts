import { deletePost } from '../../persistence/repositories/postRepository';
import { deletedPostPublisher } from '../publisher/deletedPost';
import redisClient from '../redisSubClient';

export const deletedPostApiSubscriber = () => {
    redisClient.subscribe('updated-post-api', async (message) => {
        try {
            const id = JSON.parse(message) as string;
            await deletePost(id);
            await deletedPostPublisher(id);
        } catch (error) {
            console.error('Failed to update post from message:', message, error);
        }
    });
};
