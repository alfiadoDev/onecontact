/* eslint-disable import/no-extraneous-dependencies */
import { AuthenticateUserController } from '@modules/users/useCases/authenticateUser/AuthenticateUserController'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'

const authenticateRoutes = Router()

const authenticateUserController = new AuthenticateUserController()

authenticateRoutes.post(
  '/sessions',
  celebrate(
    {
      [Segments.BODY]: {
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  authenticateUserController.handle,
)

export { authenticateRoutes }
