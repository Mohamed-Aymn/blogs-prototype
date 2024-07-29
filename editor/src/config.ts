import dotenv from 'dotenv';

dotenv.config();

export const config = {
    redis: {
        url: process.env.REDIS_URL || "redis://localhost:6379",
    },
    db: {
        url: process.env.MONGO_DB_URL || 'mongodb://localhost:27017',
        dbName: process.env.MONGO_DB_NAME || 'blogs'
    },
    app: {
        port: process.env.PORT || 3000,
        url: process.env.APP_URL || 'http://localhost:3000',
    },
    jwt: {
        secret: process.env.JWT_SECRET as string,
    }
};
