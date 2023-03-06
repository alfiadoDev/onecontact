import { CreateContactController } from '@modules/contacts/useCases/createContact/CreateContactController'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'

import { ensureAuthenticate } from '../middlewares/ensureAuthenticate'

const contactRoutes = Router()

const createContactController = new CreateContactController()

contactRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      number: Joi.string().required(),
    },
  }),
  ensureAuthenticate,
  createContactController.handle,
)

export { contactRoutes }
