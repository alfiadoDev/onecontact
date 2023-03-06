/* eslint-disable prettier/prettier */
import { ICreateContactDTO } from "../dtos/ICreateContactDTO";
import { Contact } from "../infra/typeorm/entities/Contact";

export interface IContactRepository {
  create(data: ICreateContactDTO): Promise<Contact>
  findByName(name: string): Promise<Contact | null>
  findByNumber(number: string): Promise<Contact | null>
}
