import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { container } from 'tsyringe'

import '@modules/users/providers'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
