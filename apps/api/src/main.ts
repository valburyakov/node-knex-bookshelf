import express from 'express';
import bodyParser from 'body-parser';
import { knex } from './db/knex';
import authController from './app/auth/auth.controller';

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

  app.use('/auth', authController);

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
