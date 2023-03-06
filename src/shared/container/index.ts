import { ContactRepository } from '@modules/contacts/infra/typeorm/repositories/ContactRepository'
import { IContactRepository } from '@modules/contacts/repositories/IContactRepository'
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { container } from 'tsyringe'

import '@modules/users/providers'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)

container.registerSingleton<IContactRepository>(
  'ContactRepository',
  ContactRepository,
)
