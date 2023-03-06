import { Router } from 'express'

import { authenticateRoutes } from './authenticate.routes'
import { contactRoutes } from './contact.routes'

const routes = Router()

routes.use('/contacts', contactRoutes)
routes.use(authenticateRoutes)

export { routes }
