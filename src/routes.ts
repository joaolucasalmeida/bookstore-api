import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { authMiddleware } from './middlewares/authMiddleware'
import { BookController } from './controllers/BookController'

const routes = Router()

routes.post('/login', UserController.login)
routes.post('/users', UserController.create)

routes.get('/books', BookController.findByQuery)
routes.get('/books/:id', BookController.findById)
routes.post('/books', BookController.create)
routes.put('/books/:id', BookController.update)
routes.delete('/books/:id', BookController.delete)

//routes.use(authMiddleware)


export default routes
