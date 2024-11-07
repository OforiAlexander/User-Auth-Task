import Joi from 'joi';

const schemas = {
  register: Joi.object({
    username: Joi.string()
      .min(3)
      .max(55)
      .required()
      .messages({
        'string.min': 'Username must be at least 3 characters long',
        'string.max': 'Username cannot exceed 55 characters',
        'any.required': 'Username is required'
      }),
    password: Joi.string()
      .min(8)
      .required()
      .messages({
        'string.min': 'Password must be at least 8 characters long',
        'any.required': 'Password is required'
      })
  }),
  
  login: Joi.object({
    username: Joi.string()
      .required()
      .messages({
        'any.required': 'Username is required'
      }),
    password: Joi.string()
      .required()
      .messages({
        'any.required': 'Password is required'
      })
  })
};

export const validate = (schemaName) => {
  return async (req, res, next) => {
    try {
      await schemas[schemaName].validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: 'Validation error',
        errors: error.details.map(detail => ({
          field: detail.context.key,
          message: detail.message
        }))
      });
    }
  };
};