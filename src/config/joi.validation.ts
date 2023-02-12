import * as Joi from 'joi'

export const joiValidationSchema = Joi.object({
  DB_URI: Joi.required(),
  PORT: Joi.number().default(3000),
  DATA_URL: Joi.required(),
})
