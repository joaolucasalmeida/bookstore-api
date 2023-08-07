import { Request, Response } from 'express'

import { UserService } from '../services/UserService'

export class UserController {
	static async findAll(req: Request, res: Response) { 
		const users = await UserService.findAll()
		return res.status(201).json({ message: "Usuarios Encontrados", data: users })
	}

	static async create(req: Request, res: Response) {
		const user = await UserService.create(req.body)
		return res.status(201).json({ message: "Usuário Criado", data: user })
	}

	static async login(req: Request, res: Response) {
		const userLogin = await UserService.login(req.body)
		return res.json({ message: "Usuário Logado", user: userLogin})
	}
}
