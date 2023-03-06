/* eslint-disable prettier/prettier */
import { Contact } from "@modules/contacts/infra/typeorm/entities/Contact";
import { IContactRepository } from "@modules/contacts/repositories/IContactRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListContactsUseCase {
  constructor(
    @inject('ContactRepository')
    private contactRepository: IContactRepository
  ) { }

  async execute(user_id: string, searchText?: string | undefined): Promise<Contact[]> {
    const contacts = await this.contactRepository.get(user_id, searchText)

    return contacts
  }
}

export { ListContactsUseCase }
