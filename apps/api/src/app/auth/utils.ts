import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { Request, Response, NextFunction } from 'express';
import { config } from '../../config';

export function getToken(user: User) {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    config.JWT_SECRET,
    {
      expiresIn: '48h',
    }
  );
}

export function isAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send({ message: 'Token is not supplied.' });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).send({ message: 'Invalid Token' });
  }
}
