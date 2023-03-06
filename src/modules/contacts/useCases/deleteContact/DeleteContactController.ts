import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { DeleteContactUseCase } from './DeleteContactUseCase'

class DeleteContactController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { contact_id } = request.params
    const { id: user_id } = request.user

    const deleteContactUseCase = container.resolve(DeleteContactUseCase)

    await deleteContactUseCase.execute(contact_id, user_id)

    return response.status(200).send()
  }
}

export { DeleteContactController }
