import { IntegerType, ObjectId } from "mongodb";

export interface IPost{
    _id?: ObjectId;
    title: string;
    content: Array<IPostItem>
} 

export interface IPostItem{
    type: IntegerType;
    data: string;
}