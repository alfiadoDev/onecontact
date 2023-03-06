/* eslint-disable prettier/prettier */
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { User } from '../infra/typeorm/entities/User'

interface IUserRepository {
  findByEmail(email: string): Promise<User | null>
  create(data: ICreateUserDTO): Promise<User>
}

export { IUserRepository }
