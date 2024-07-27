import dotenv from 'dotenv';

dotenv.config();

export const config = {
    redis: {
        url: process.env.REDIS_URL || "redis://localhost:6379",
    },
    db: {
        url: process.env.DATABASE_URL || 'mongodb://localhost:27017/mydb',
    },
    app: {
        port: process.env.PORT || 3000,
        url: process.env.APP_URL || 'http://localhost:3000',
    },
};
