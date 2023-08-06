import { Request, Response } from 'express'
import { BadRequestError } from '../helpers/api-erros'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserRepository from '../repositories/UserRepository'
import { IUser } from '../interfaces/IUser'

export class UserController {
	static async findAll(req: Request, res: Response) {
		const users = await UserRepository.findAll() 
		return res.status(201).json(users)
	}

	static async create(req: Request, res: Response) {
		const { name, email, password } = req.body

		const userExists = await UserRepository.getByEmail(email)

		if (userExists) {
			throw new BadRequestError('E-mail já existe')
		}

		const hashPassword = await bcrypt.hash(password, 10)

		const newUser: IUser = await UserRepository.create({
			name,
			email,
			password: hashPassword,
		})

		const user = { name: newUser.name, email: newUser.email, password: undefined }

		return res.status(201).json(user)
	}

	static async login(req: Request, res: Response) {
		const { email, password } = req.body

		const user = await UserRepository.getByEmail(email)

		if (!user) {
			throw new BadRequestError('E-mail ou senha inválidos')
		}

		const verifyPass = await bcrypt.compare(password, user.password)

		if (!verifyPass) {
			throw new BadRequestError('E-mail ou senha inválidos')
		}

		const token = jwt.sign({ id: user._id?.toString() }, process.env.JWT_PASS ?? '', {
			expiresIn: '8h',
		})

		const userLogin = { name: user.name, email: user.email, password: undefined }

		return res.json({
			user: userLogin,
			token: token,
		})
	}
}
