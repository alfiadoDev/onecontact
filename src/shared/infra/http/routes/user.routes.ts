import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'

const userRoutes = Router()

const createUserController = new CreateUserController()

userRoutes.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  createUserController.handle,
)

export { userRoutes }
