import Joi from 'joi';

export const userSchema = Joi.object({
  name: Joi.string().alphanum().required(),
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().min(6).required(),
});
