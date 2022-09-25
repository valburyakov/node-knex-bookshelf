import express from 'express';
import bodyParser from 'body-parser';
import { knex } from './db/knex';
import authController from './app/auth/auth.controller';
import shelfController from './app/shelf/shelf.controller';
import { isAuth } from './app/auth/utils';

export async function main() {
  const app = express();

  // Verify the connection before proceeding
  try {
    await knex.raw('SELECT now()');
  } catch (error) {
    throw new Error(
      'Unable to connect to Postgres via Knex. Ensure a valid connection.'
    );
  }

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use('/api/auth', authController);
  app.use('/api/shelf', isAuth, shelfController);

  const port = process.env.PORT || 3333;
  const server = app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/api');
  });
  server.on('error', console.error);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
