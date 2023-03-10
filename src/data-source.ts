import 'dotenv/config'
import { DataSource, DataSourceOptions } from 'typeorm'
import { SeederOptions } from 'typeorm-extension'

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database:
    process.env.NODE_ENV === 'test'
      ? process.env.DB_TEST_NAME
      : process.env.DB_NAME,
  entities: [`${__dirname}/modules/**/infra/typeorm/entities/*{.js,.ts}`],
  migrations: [`${__dirname}/shared/infra/typeorm/migrations/*{.js,.ts}`],
  seeds: [`${__dirname}/shared/infra/typeorm/seeds/MainSeeder{.js,.ts}`],
  factories: [
    `${__dirname}/shared/infra/typeorm/seeds/factories/**/*{.ts,.js}`,
  ],
}

const AppDataSource = new DataSource(options)

export default AppDataSource
