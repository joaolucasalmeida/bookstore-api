import BookRepository from '../repositories/BookRepository'
import { IBook } from '../interfaces/IBook'
import { FilterQuery } from 'mongoose';
import { BadRequestError } from '../helpers/api-erros';

export class BookService {
    static async findById(id: string): Promise<IBook | null> {
        return await BookRepository.findById(id);
    }

    static async findByQuery(query: FilterQuery<IBook> = {}): Promise<IBook[]> {
        const books: IBook[] = await BookRepository.findByQuery(query);
        return books;
    }

	static async create(data: IBook) {
        return await BookRepository.create(data)
	}

	static async update(id: string, data: IBook) {
        const book = await BookRepository.findById(id)
        if(!book) 
            throw new BadRequestError("Livro não existe")

        if(book.rentedBy && (data.rentedBy != null))
            throw new BadRequestError('Livro ja foi alugado')

        return await BookRepository.updateById(id, data)
	}

    static async delete(id: string) {
        return await BookRepository.deleteById(id)
	}
}
