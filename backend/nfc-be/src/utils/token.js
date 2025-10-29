import jwt from 'jsonwebtoken';
import { envConfig } from '../config/envConfig.js';

export const generateToken = (payload) => {
  return jwt.sign(payload, envConfig.jwt.secret, {
    expiresIn: envConfig.jwt.expiresIn,
  });
};
