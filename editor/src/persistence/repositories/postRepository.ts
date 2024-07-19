import { Collection, ObjectId, IntegerType } from 'mongodb';
import { getDatabase } from '../db';
import { IPost } from '../types/post';

const getPostsCollection = (): Collection<IPost> => {
    return getDatabase().collection<IPost>('posts');
};

export const createPost = async (post: IPost): Promise<IPost> => {
    const collection = getPostsCollection();
    const result = await collection.insertOne(post);
    post._id = result.insertedId;
    return post;
};

export const getPostById = async (id: string): Promise<IPost | null> => {
    const collection = getPostsCollection();
    const post = await collection.findOne({ _id: new ObjectId(id) });
    return post;
};

export const getAllPosts = async (): Promise<IPost[]> => {
    const collection = getPostsCollection();
    const posts = await collection.find().toArray();
    return posts;
};

export const updatePost = async (id: string, post: Partial<IPost>): Promise<void> => {
    const collection = getPostsCollection();
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: post });
};

export const deletePost = async (id: string): Promise<void> => {
    const collection = getPostsCollection();
    await collection.deleteOne({ _id: new ObjectId(id) });
};
