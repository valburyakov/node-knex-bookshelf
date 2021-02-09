import * as Knex from 'knex';

export async function up(knex: Knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  await knex.schema.createTableIfNotExists('User', function(table) {
    table.uuid('id')
      .primary()
      .notNullable()
      .unique()
      .defaultTo(knex.raw('uuid_generate_v4()'))
    table.string('email').unique().notNullable();
    table.string('name');
    table.boolean('active').defaultTo(true)
  });

  await knex.schema.createTableIfNotExists('Book', function(table) {
    table.uuid('id')
      .primary()
      .notNullable()
      .unique()
      .defaultTo(knex.raw('uuid_generate_v4()'))
    table.string('title').unique().notNullable();
    table.string('author');
    table.string('category');
    table.integer('pages');
  });

  await knex.schema.createTableIfNotExists('Shelf', function(table) {
    table.increments('id').primary();
    table.string('name').unique().notNullable();
    table.uuid('user_id').notNullable();
    table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));

    table.foreign('user_id').references('id').inTable('User');
  });

  await knex.schema.createTableIfNotExists('BookShelf', function(table) {
    table.uuid('book_id').notNullable();
    table.integer('shelf_id').notNullable();
    table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));

    table.foreign('book_id').references('id').inTable('Book');
    table.foreign('shelf_id').references('id').inTable('Shelf');

    table.primary(['book_id', 'shelf_id'])
  });

}

export async function down(knex: Knex) {
  throw new Error('Downward migrations are not supported. Restore from backup.')
}
