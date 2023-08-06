import { Request, Response } from 'express'
import { BookService } from '../services/BookService'
import { FilterQuery } from 'mongoose';
import { IBook } from '../interfaces/IBook';

export class BookController {
        static async findById(req: Request, res: Response) {
                const book = await BookService.findById(req.params.id);
                return res.status(201).json(book)
        }
        
        static async findByQuery(req: Request, res: Response) {
                const query: FilterQuery<IBook> = req.query;
                const books: IBook[] = await BookService.findByQuery(query);
                return res.status(201).json(books)
        }

        static async create(req: Request, res: Response) {
                const book = await BookService.create(req.body)
                return res.status(201).json({ message: "Livro criado com sucesso" })
        }

        static async update(req: Request, res: Response) {
                const book = await BookService.update(req.params.id, req.body)
                return res.status(201).json({ message: "Livro atualizado com sucesso" })
        }

        static async delete(req: Request, res: Response) {
                const book = await BookService.delete(req.params.id)
                return res.status(201).json({ message: "Livro excluído com sucesso" })
        }
}
