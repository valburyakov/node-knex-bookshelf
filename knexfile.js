// Update with your config settings.
require('ts-node').register({
  project: 'apps/api/tsconfig.app.json'
});

require('dotenv').config();

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.DATABASE_HOSTNAME,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      port: Number(process.env.DATABASE_PORT),
    },
    pool: {
      min: Number(process.env.DATABASE_POOL_MIN) || 2,
      max: Number(process.env.DATABASE_POOL_MAX) || 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },
};
