import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { authMiddleware } from './middlewares/authMiddleware'
import { BookController } from './controllers/BookController'

const routes = Router()

routes.post('/login', UserController.login)
routes.get('/users', authMiddleware, UserController.findAll)
routes.post('/users', authMiddleware, UserController.create)

routes.get('/books', authMiddleware, BookController.findByQuery)
routes.get('/books/:id',authMiddleware, BookController.findById)
routes.post('/books', authMiddleware, BookController.create)
routes.put('/books/:id', authMiddleware, BookController.update)
routes.delete('/books/:id', authMiddleware, BookController.delete)

export default routes
