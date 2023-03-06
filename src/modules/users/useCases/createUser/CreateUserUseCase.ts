/* eslint-disable prettier/prettier */
import { User } from "@modules/users/infra/typeorm/entities/User";
import { IHashProvider } from "@modules/users/providers/HashProvider/models/IHashProvider";
import { IUserRepository } from "@modules/users/repositories/IUserRepository";
import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";

interface IRequest {
  first_name: string
  last_name: string
  email: string
  password: string
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }

  async execute({ first_name, last_name, email, password }: IRequest): Promise<User> {
    const userExists = await this.userRepository.findByEmail(email)

    if (userExists) throw new AppError('User already exists!')

    const hashedPassword = await this.hashProvider.generateHash(password)

    const user = await this.userRepository.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    })

    return user
  }
}

export { CreateUserUseCase }
