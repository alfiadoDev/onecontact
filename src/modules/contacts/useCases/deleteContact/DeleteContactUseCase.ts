/* eslint-disable prettier/prettier */
import { IContactRepository } from "@modules/contacts/repositories/IContactRepository";
import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";

@injectable()
class DeleteContactUseCase {
  constructor(
    @inject('ContactRepository')
    private contactRepository: IContactRepository
  ) { }

  async execute(id: string, user_id: string): Promise<void> {
    const contact = await this.contactRepository.findByIdAndUserId(id, user_id)

    if (!contact) throw new AppError('Contact not found!')

    await this.contactRepository.delete(contact.id)
  }
}

export { DeleteContactUseCase }
