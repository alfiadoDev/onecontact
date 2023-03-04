import { User } from '../infra/typeorm/entities/User'

interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
}

export { IUserRepository }
