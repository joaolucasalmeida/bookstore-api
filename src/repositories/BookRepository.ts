import { IBook } from '../interfaces/IBook';
import { Book } from '../models/Book'; // Update the import path accordingly
import { FilterQuery } from 'mongoose';

class BookRepository {
    static async findById(id: string): Promise<IBook | null> {
        return Book.findOne({ _id: id });
    }

    static async findByQuery(query: FilterQuery<IBook> = {}): Promise<IBook[]> {
        return Book.find(query);
    }

    static async create(data: IBook): Promise<IBook> {
        const book = new Book(data);
        return await book.save();
    }

    static async updateById(id: string, updateData: Partial<IBook>): Promise<IBook | null> {
        return Book.findByIdAndUpdate(id, updateData, { new: true });
    }

    static async deleteById(id: string): Promise<IBook | null> {
        return Book.findByIdAndDelete(id);
    }
}

export default BookRepository;
