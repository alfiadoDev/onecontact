// eslint-disable-next-line import/no-unresolved
import AppDataSource from '@data/data-source'

export default async (): Promise<void> => {
  if (!AppDataSource.isInitialized && process.env.NODE_ENV !== 'test') {
    await AppDataSource.initialize()

    console.log('Database connected!')
  }
}
