import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateContactUseCase } from './CreateContactUseCase'

class CreateContactController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, number } = request.body
    const { id: user_id } = request.user

    const createContactUseCase = container.resolve(CreateContactUseCase)

    const contact = await createContactUseCase.execute({
      user_id,
      name,
      number,
    })

    return response.json(contact)
  }
}

export { CreateContactController }
