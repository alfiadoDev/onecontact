/* eslint-disable prettier/prettier */
// eslint-disable-next-line import/no-unresolved
import AppDataSource from '@data/data-source'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { Repository } from 'typeorm'


import { User } from '../entities/User'

class UserRepository implements IUserRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = AppDataSource.getRepository(User)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOne({
      where: { email },
    })

    return user;
  }
}

export { UserRepository }
