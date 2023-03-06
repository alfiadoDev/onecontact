/* eslint-disable prettier/prettier */
import { ICreateContactDTO } from "../dtos/ICreateContactDTO";
import { Contact } from "../infra/typeorm/entities/Contact";

export interface IContactRepository {
  create(data: ICreateContactDTO): Promise<Contact>
  findByName(name: string): Promise<Contact | null>
  findByNumber(number: string): Promise<Contact | null>
  findByIdAndUserId(id: string, user_id: string): Promise<Contact | null>
  update(contact: Contact): Promise<Contact>
  delete(id: string): Promise<void>
  get(user_id: string, searchText: string | undefined): Promise<Contact[]>
}
