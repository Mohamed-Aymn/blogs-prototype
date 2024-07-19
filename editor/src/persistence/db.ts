import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.MONGO_DB_URL as string
const dbName = process.env.MONGO_DB_NAME as string
let db: Db;

export const connectToDatabase = async () => {
  const client = new MongoClient(url);
  await client.connect();
  db = client.db(dbName);
  console.log('Connected to MongoDB');
};

export const getDatabase = (): Db => {
  if (!db) {
    throw new Error('Database not connected. Call connectToDatabase first.');
  }
  return db;
};
