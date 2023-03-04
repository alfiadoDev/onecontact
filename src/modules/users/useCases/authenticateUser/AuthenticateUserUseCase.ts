/* eslint-disable prettier/prettier */
import auth from '@config/auth'
import { User } from '@modules/users/infra/typeorm/entities/User';
import { IHashProvider } from '@modules/users/providers/HashProvider/models/IHashProvider';
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'


import AppError from '@shared/errors/AppError';

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) throw new AppError('Invalid email or password!')

    const compareHash = await this.hashProvider.compareHash(
      password,
      user.password
    )

    if (!compareHash) throw new AppError('Invalid email or password!')

    const token = sign({}, auth.secret, {
      subject: user.id,
      expiresIn: auth.expires_in,
    })

    return {
      user,
      token,
    }
  }
}

export { AuthenticateUserUseCase }
