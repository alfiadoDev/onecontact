import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListContactsUseCase } from './ListContactsUseCase'

class ListContactsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { search } = request.query
    const { id: user_id } = request.user

    const listContactsUseCase = container.resolve(ListContactsUseCase)

    const contacts = await listContactsUseCase.execute(
      user_id,
      search?.toString(),
    )

    return response.json(contacts)
  }
}

export { ListContactsController }
