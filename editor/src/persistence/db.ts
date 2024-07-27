import { MongoClient, Db } from 'mongodb';
import { config } from '../config';

let db: Db;

export const connectToDatabase = async () => {
  const client = new MongoClient(config.db.url);
  await client.connect();
  db = client.db(config.db.dbName);
  console.log('Connected to MongoDB');
};

export const getDatabase = (): Db => {
  if (!db) {
    throw new Error('Database not connected. Call connectToDatabase first.');
  }
  return db;
};
