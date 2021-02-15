import express from 'express';
import { hash, compare } from 'bcrypt';
import { getToken } from './utils';
import { knex } from '../../db/knex';
import { User } from '../models/user';
import { userSchema } from './validation';

const router = express.Router();

router.post('/signin', async (req, res) => {
  const signinUser = await knex
    .select()
    .first()
    .where({
      email: req.body.email,
    })
    .from<User>('User');

  if (signinUser) {
    const match = await compare(req.body.password, signinUser.password);

    if (!match) {
      res.status(401).send({ message: 'Invalid Email or Password.' });
    }

    res.send({
      id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      token: getToken(signinUser),
    });
  } else {
    res.status(404).send({ message: 'User does not exist' });
  }
});

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const { error: validationError } = userSchema.validate({
    name,
    email,
    password,
  });

  if (validationError) {
    res.status(400).send({
      message: 'Invalid User Data.',
      details: validationError.details.map((detail) => detail.message),
    });
  }

  try {
    const newUser = await knex
      .insert({
        name,
        email,
        password: await hash(password, 10),
      })
      .into<User>('User')
      .returning('*');

    res.send({
      id: newUser[0].id,
      name: newUser[0].name,
      email: newUser[0].email,
      token: getToken(newUser[0]),
    });
  } catch (e) {
    res.status(400).send({ message: 'User already exists' });
  }
});

export default router;
