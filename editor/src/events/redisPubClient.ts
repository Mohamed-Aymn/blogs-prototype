import { createClient } from 'redis';
import { config } from '../config';

const redisPubClient = createClient({
    url: config.redis.url,
});

redisPubClient.on('error', (err) => console.error('Redis Client Error', err));

export const connectRedisPub = async () => {
    await redisPubClient.connect();
    console.log('Connected to Redis as publisher');
};

export default redisPubClient;
