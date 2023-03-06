import { AddOrRemoveToFavoriteController } from '@modules/contacts/useCases/addOrRemoveToFavorite/AddOrRemoveToFavoriteController'
import { CreateContactController } from '@modules/contacts/useCases/createContact/CreateContactController'
import { DeleteContactController } from '@modules/contacts/useCases/deleteContact/DeleteContactController'
import { ListContactsController } from '@modules/contacts/useCases/listContacts/ListContactsController'
import { UpdateContactController } from '@modules/contacts/useCases/updateContact/UpdateContactController'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'

import { ensureAuthenticate } from '../middlewares/ensureAuthenticate'

const contactRoutes = Router()

const createContactController = new CreateContactController()
const updateContactController = new UpdateContactController()
const deleteContactController = new DeleteContactController()
const addOrRemoveToFavoriteController = new AddOrRemoveToFavoriteController()
const listContactsController = new ListContactsController()

contactRoutes.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().required(),
        number: Joi.string().required(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  ensureAuthenticate,
  createContactController.handle,
)
contactRoutes.put(
  '/:contact_id',
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().required(),
        number: Joi.string().required(),
      },
      [Segments.PARAMS]: {
        contact_id: Joi.string().uuid().required(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  ensureAuthenticate,
  updateContactController.handle,
)

contactRoutes.delete(
  '/:contact_id',
  celebrate({
    [Segments.PARAMS]: {
      contact_id: Joi.string().uuid().required(),
    },
  }),
  ensureAuthenticate,
  deleteContactController.handle,
)

contactRoutes.patch(
  '/:contact_id/favorite',
  celebrate({
    [Segments.PARAMS]: {
      contact_id: Joi.string().uuid().required(),
    },
  }),
  ensureAuthenticate,
  addOrRemoveToFavoriteController.handle,
)

contactRoutes.get('/', ensureAuthenticate, listContactsController.handle)

export { contactRoutes }
