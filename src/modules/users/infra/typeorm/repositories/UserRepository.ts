/* eslint-disable prettier/prettier */
// eslint-disable-next-line import/no-unresolved
import AppDataSource from '@data/data-source'
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { Repository } from 'typeorm'


import { User } from '../entities/User'

class UserRepository implements IUserRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = AppDataSource.getRepository(User)
  }

  async create(data: ICreateUserDTO): Promise<User> {
    const user = this.repository.create(data)

    await this.repository.save(user)

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOne({
      where: { email },
    })

    return user;
  }
}

export { UserRepository }
