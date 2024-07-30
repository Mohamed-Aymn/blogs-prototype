import { ObjectId } from "mongodb";

export interface IPostUpdatedEvent{
    _id: string | ObjectId;
    userId: string;
    title: string;
    content: Array<IPostItem>;
} 

export interface IPostItem{
    type: Number;
    data: string;
}