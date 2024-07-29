import redisClient from '../redisPubClient';
import { IPostCreatedEvent } from '../types/postCreatedEvent';

export const createdPostPublisher = async (event: IPostCreatedEvent) => {
    await redisClient.publish('post-created', JSON.stringify(event));
}
