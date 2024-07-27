import { ObjectId } from "mongodb";

export interface IPostCreatedEvent{
    _id: string | ObjectId;
    title: string;
    content: Array<IPostItem>;
} 

export interface IPostItem{
    type: Number;
    data: string;
}