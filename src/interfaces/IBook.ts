import mongoose from 'mongoose';

export interface IBook {
    _id?: mongoose.Types.ObjectId;
    title: string;
    author: string;
    isbn?: string;
    publishedDate?: Date;
    pages?: number;
    genre?: string;
    rentedBy?: mongoose.Types.ObjectId;
}