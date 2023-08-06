import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { authMiddleware } from './middlewares/authMiddleware'

const routes = Router()

routes.post('/user', UserController.create)
routes.post('/login', UserController.login)

routes.use(authMiddleware)


export default routes
