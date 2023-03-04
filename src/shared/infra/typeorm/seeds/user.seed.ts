import { User } from '@modules/users/infra/typeorm/entities/User'
import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'

export default class UserSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const userRepository = dataSource.getRepository(User)

    const user = userRepository.create({
      first_name: 'usuario',
      last_name: 'teste1',
      email: 'teste1@teste.com',
      password: '$2a$08$R.Y5fFFVnOSENEjcGZ4Sde75ZTWujjYEs4FaYC6oGSBafC78J7ZvW',
    })

    await userRepository.save(user)

    const user2 = userRepository.create({
      first_name: 'usuario',
      last_name: 'teste2',
      email: 'teste2@teste.com',
      password: '$2a$08$R.Y5fFFVnOSENEjcGZ4Sde75ZTWujjYEs4FaYC6oGSBafC78J7ZvW',
    })

    await userRepository.save(user2)
  }
}
