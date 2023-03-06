import { instanceToInstance } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateUserUseCase } from './CreateUserUseCase'

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { first_name, last_name, email, password } = request.body

    const createUserUseCase = container.resolve(CreateUserUseCase)

    const user = await createUserUseCase.execute({
      first_name,
      last_name,
      email,
      password,
    })

    return response.status(201).json(instanceToInstance(user))
  }
}

export { CreateUserController }
