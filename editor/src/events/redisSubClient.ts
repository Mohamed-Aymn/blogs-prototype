import { createClient } from 'redis';
import { config } from '../config';

const redisSubClient = createClient({
    url: config.redis.url,
});

redisSubClient.on('error', (err) => console.error('Redis Client Error', err));

export const connectRedisSub = async () => {
    await redisSubClient.connect();
    console.log('Connected to Redis as subscriber');
};

export default redisSubClient;
