import { Collection, ObjectId } from 'mongodb';
import { getDatabase } from '../db';
import { IPost } from '../types/post';

const getPostsCollection = (): Collection<IPost> => {
    return getDatabase().collection<IPost>('users');
};

export const createPost = async (user: IPost): Promise<IPost> => {
    const collection = getPostsCollection();
    const result = await collection.insertOne(user);
    user._id = result.insertedId.toString();
    return user;
};

export const getPostById = async (id: string): Promise<IPost | null> => {
    const collection = getPostsCollection();
    const user = await collection.findOne({ _id: new ObjectId(id) });
    return user;
};

export const updatePost = async (id: string, user: Partial<IPost>): Promise<void> => {
    const collection = getPostsCollection();
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: user });
};

export const deletePost = async (id: string): Promise<void> => {
    const collection = getPostsCollection();
    await collection.deleteOne({ _id: new ObjectId(id) });
};
