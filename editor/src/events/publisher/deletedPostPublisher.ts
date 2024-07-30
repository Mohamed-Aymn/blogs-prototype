import redisClient from '../redisPubClient';

export const deletedPostPublisher = async (id: string) => {
    await redisClient.publish('post-deleted', JSON.stringify(id));
}
