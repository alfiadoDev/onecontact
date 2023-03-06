/* eslint-disable prettier/prettier */
import { Contact } from "@modules/contacts/infra/typeorm/entities/Contact";
import { IContactRepository } from "@modules/contacts/repositories/IContactRepository";
import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";

interface IRequest {
  contact_id: string
  user_id: string
  name: string
  number: string
}

@injectable()
class UpdateContactUseCase {
  constructor(
    @inject('ContactRepository')
    private contactRepository: IContactRepository
  ) { }

  async execute({ contact_id, user_id, name, number }: IRequest): Promise<Contact> {
    const contact = await this.contactRepository.findByIdAndUserId(contact_id, user_id)

    if (!contact) throw new AppError('Contact not found!')

    let isClean = true

    if (name.toLowerCase() !== contact.name) {
      const contactNameExists = await this.contactRepository.findByName(name.toLowerCase())

      if (contactNameExists) throw new AppError('Contact name already exists!')
      else {
        contact.name = name.toLowerCase()
        isClean = false
      }
    }

    if (number !== contact.number) {
      const contactNumberExists = await this.contactRepository.findByNumber(number)

      if (contactNumberExists) throw new AppError('Contact number already exists!')
      else {
        contact.number = number
        isClean = false
      }
    }

    return isClean ? contact : this.contactRepository.update(contact)
  }
}

export { UpdateContactUseCase }
