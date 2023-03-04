import AppDataSource from '@data-source/data-source'

export default async (): Promise<void> => {
  if (!AppDataSource.isInitialized && process.env.NODE_ENV !== 'test') {
    await AppDataSource.initialize()

    console.log('Database connected!')
  }
}
