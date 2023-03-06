/* eslint-disable prettier/prettier */
import AppDataSource from "@data/data-source"
import { ICreateContactDTO } from "@modules/contacts/dtos/ICreateContactDTO"
import { IContactRepository } from "@modules/contacts/repositories/IContactRepository"
import { Repository } from "typeorm"

import { Contact } from "../entities/Contact"

class ContactRepository implements IContactRepository {

  private repository: Repository<Contact>

  constructor() {
    this.repository = AppDataSource.getRepository(Contact)
  }
  async create(data: ICreateContactDTO): Promise<Contact> {
    const contact = this.repository.create(data);

    await this.repository.save(contact)

    return contact
  }
  async findByName(name: string): Promise<Contact | null> {
    const contact = await this.repository.findOne({
      where: {
        name,
      }
    })

    return contact
  }
  async findByNumber(number: string): Promise<Contact | null> {
    const contact = await this.repository.findOne({
      where: {
        number,
      }
    })

    return contact
  }

}

export { ContactRepository }
