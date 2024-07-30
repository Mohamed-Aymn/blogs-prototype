import redisClient from '../redisPubClient';
import { IPostUpdatedEvent } from '../types/postUpdatedEvent';

export const updatedPostPublisher = async (event: IPostUpdatedEvent) => {
    await redisClient.publish('post-deleted', JSON.stringify(event));
}