import Joi, { PresenceMode } from 'joi';
import { ValidationType } from '../@types/types';

export const userValidation: ValidationType = (datas, forPost = true) => {
  const presence: PresenceMode = forPost ? 'required' : 'optional';

  return Joi.object({
    email: Joi.string().email().max(255).presence(presence),
    firstname: Joi.string().max(50).presence(presence),
    lastname: Joi.string().max(50).presence(presence),
    city: Joi.string().allow(null, '').max(50).presence(presence),
    password: Joi.string().allow(null, '').max(255).presence(presence),
  }).validate(datas, { abortEarly: false }).error;
};

export const movieValidation: ValidationType = (datas, forPost = true) => {
  const presence: PresenceMode = forPost ? 'required' : 'optional';

  return Joi.object({
    title: Joi.string().max(255).presence(presence),
    director: Joi.string().max(255).presence(presence),
    year: Joi.number().min(1900).max(2021).presence(presence),
    rating: Joi.number().min(0).max(10).presence(presence),
    duration: Joi.number().min(0).max(500).presence(presence),
    type: Joi.string().max(50).presence(presence),
  }).validate(datas, { abortEarly: false }).error;
};
