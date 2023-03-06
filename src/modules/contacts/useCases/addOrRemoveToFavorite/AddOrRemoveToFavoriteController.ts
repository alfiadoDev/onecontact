import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { AddOrRemoveToFavoriteUseCase } from './AddOrRemoveToFavoriteUseCase'

class AddOrRemoveToFavoriteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { contact_id } = request.params
    const { id: user_id } = request.user

    const addOrRemoveToFavoriteUseCase = container.resolve(
      AddOrRemoveToFavoriteUseCase,
    )

    const updatedContact = await addOrRemoveToFavoriteUseCase.execute({
      contact_id,
      user_id,
    })

    return response.json(updatedContact)
  }
}

export { AddOrRemoveToFavoriteController }
