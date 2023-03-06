import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UpdateContactUseCase } from './UpdateContactUseCase'

class UpdateContactController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, number } = request.body
    const { contact_id } = request.params
    const { id: user_id } = request.user

    const updateContactUseCase = container.resolve(UpdateContactUseCase)

    const updateContact = await updateContactUseCase.execute({
      contact_id,
      user_id,
      name,
      number,
    })

    return response.json(updateContact)
  }
}

export { UpdateContactController }
