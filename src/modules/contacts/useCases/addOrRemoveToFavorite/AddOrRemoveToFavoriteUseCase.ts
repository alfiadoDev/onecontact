/* eslint-disable prettier/prettier */
import { Contact } from "@modules/contacts/infra/typeorm/entities/Contact";
import { IContactRepository } from "@modules/contacts/repositories/IContactRepository";
import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";

interface IRequest {
  contact_id: string
  user_id: string
}

@injectable()
class AddOrRemoveToFavoriteUseCase {
  constructor(
    @inject('ContactRepository')
    private contactRepository: IContactRepository
  ) { }

  async execute({ contact_id, user_id, }: IRequest): Promise<Contact> {
    const contact = await this.contactRepository.findByIdAndUserId(contact_id, user_id)

    if (!contact) throw new AppError('Contact not found!')

    // quando o valor for true ele coloca false, quando for false coloca true
    contact.is_favorite = !contact.is_favorite

    const updatedContact = await this.contactRepository.update(contact)

    return updatedContact
  }
}

export { AddOrRemoveToFavoriteUseCase }
