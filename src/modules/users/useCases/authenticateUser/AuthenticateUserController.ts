import { instanceToInstance } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)

    const authenticateUser = await authenticateUserUseCase.execute({
      email,
      password,
    })

    return response.json(instanceToInstance(authenticateUser))
  }
}

export { AuthenticateUserController }
