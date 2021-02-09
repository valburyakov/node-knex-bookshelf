import Knex from 'knex';
import config from '../../../../knexfile.js';

export async function createDb() {
  const knex = Knex(config[process.env.NODE_ENV || 'development'])

  // Verify the connection before proceeding
  try {
    await knex.raw('SELECT now()')

    return knex
  } catch (error) {
    throw new Error('Unable to connect to Postgres via Knex. Ensure a valid connection.')
  }
}
