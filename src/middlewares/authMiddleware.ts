import { NextFunction, Response } from 'express'
import { UnauthorizedError } from '../helpers/api-erros'
import UserRepository from '../repositories/UserRepository'
import jwt from 'jsonwebtoken'
import { IRequestUser } from '../interfaces/IRequestUser'
import { IUser } from '../interfaces/IUser'

type JwtPayload = {
	id: string
}

export const authMiddleware = async (
	req: IRequestUser,
	res: Response,
	next: NextFunction
) => {
	const { authorization } = req.headers

	if (!authorization) {
		throw new UnauthorizedError('Não autorizado')
	}

	const token = authorization.split(' ')[1]

	const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload

	const user = await UserRepository.getById(id)

	if (!user) {
		throw new UnauthorizedError('Não autorizado')
	}

	const loggedUser = { name: user.name, email: user.email, password: undefined }

	req.user = loggedUser as Partial<IUser>

	next()
}