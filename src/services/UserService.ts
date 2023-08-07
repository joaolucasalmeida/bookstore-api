import { BadRequestError } from '../helpers/api-erros';
import { IUser } from '../interfaces/IUser';
import UserRepository from '../repositories/UserRepository';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class UserService {
    static async findAll(): Promise<IUser[] | null> {
		return await UserRepository.findAll() 
    }

	static async create(data: IUser) {
		const { name, email, password } = data
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

        return user
	}

	static async login(data: IUser) {
		const { email, password } = data
		const user = await UserRepository.getByEmail(email)

		if (!user) {
			throw new BadRequestError('E-mail ou senha inválidos')
		}

		const verifyPass = await bcrypt.compare(password.toString(), user.password.toString())

		if (!verifyPass) {
			throw new BadRequestError('E-mail ou senha inválidos')
		}

		const token = jwt.sign({ id: user._id?.toString() }, process.env.JWT_PASS ?? '', {
			expiresIn: '8h',
		})
		const userLogin = { name: user.name, email: user.email, password: undefined, token: token }
        return userLogin
	}
}
