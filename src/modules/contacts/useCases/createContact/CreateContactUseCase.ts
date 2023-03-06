/* eslint-disable prettier/prettier */
import { Contact } from "@modules/contacts/infra/typeorm/entities/Contact";
import { IContactRepository } from "@modules/contacts/repositories/IContactRepository";
import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";

interface IRequest {
  user_id: string
  name: string
  number: string
}

@injectable()
class CreateContactUseCase {
  constructor(
    @inject('ContactRepository')
    private contactRepository: IContactRepository
  ) { }

  async execute({ user_id, name, number }: IRequest): Promise<Contact> {
    const contactNameExists = await this.contactRepository.findByName(name.toLowerCase());

    if (contactNameExists) throw new AppError('Contact name already exists!')

    const contactNumberExists = await this.contactRepository.findByNumber(number)

    if (contactNumberExists) throw new AppError('Contact number already exists!')

    const contact = await this.contactRepository.create({
      user_id,
      name: name.toLowerCase(),
      number
    })

    return contact
  }
}

export { CreateContactUseCase }
