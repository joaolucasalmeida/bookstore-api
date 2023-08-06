import { IUser } from '../interfaces/IUser';
import { User } from '../models/User'; 

class UserRepository {
  static async getById(id: string): Promise<IUser | null> {
    return User.findById(id).exec();
  }

  static async getByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email }).exec();
  }

  static async create(data: IUser
  ): Promise<IUser> {
    const user = new User(data);
    await user.save();
    return user;
  }

  static async update(id: string, data: Partial<IUser>): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  static async delete(id: string): Promise<IUser | null> {
    return User.findByIdAndDelete(id).exec();
  }
}

export default UserRepository;
