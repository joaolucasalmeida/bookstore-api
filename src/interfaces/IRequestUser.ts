import { IUser } from "./IUser";
import { Request } from 'express'

export interface IRequestUser extends Request {
	user?: Partial<IUser>;
}