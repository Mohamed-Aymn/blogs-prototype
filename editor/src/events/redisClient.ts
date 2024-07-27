import { createClient } from 'redis';
import { config } from '../config';

const redisClient = createClient({
    url: config.redis.url,
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

export const connectRedis = async () => {
    await redisClient.connect();
    console.log('Connected to Redis');
};

export default redisClient;
