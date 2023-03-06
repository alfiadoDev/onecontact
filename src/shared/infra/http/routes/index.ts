import { Router } from 'express'

import { authenticateRoutes } from './authenticate.routes'
import { contactRoutes } from './contact.routes'
import { userRoutes } from './user.routes'

const routes = Router()

routes.use('/users', userRoutes)
routes.use('/contacts', contactRoutes)
routes.use(authenticateRoutes)

export { routes }
