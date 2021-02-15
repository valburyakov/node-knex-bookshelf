import * as Knex from 'knex';
import { hash } from 'bcrypt';

export async function seed(knex: Knex) {
  await knex('Shelf').del();
  await knex('User').del();
  await knex('BookShelf').del();
  await knex('Book').del();
  await knex('Shelf').del();

  const userIds = await knex('User')
    .insert([
      {
        name: 'User1',
        email: 'user1@mail.com',
        password: await hash('123', 10),
      },
      {
        name: 'User2',
        email: 'user2@mail.com',
        password: await hash('123', 10),
      },
    ])
    .returning('id');

  const shelfIds = await knex('Shelf')
    .insert([
      { name: 'Shelf 1', user_id: userIds[0] },
      { name: 'Shelf 2', user_id: userIds[1] },
    ])
    .returning('id');

  const bookIds = await knex('Book')
    .insert([
      {
        title: 'Три товарища',
        author: 'Э.М. Ремарк',
        category: 'Классика',
        pages: 500,
      },
      {
        title: 'Мастер и Маргарита',
        author: 'Булгаков',
        category: 'Классика',
        pages: 400,
      },
      {
        title: 'Унесенные ветром',
        author: 'Маргарет Митчелл',
        category: 'Роман',
        pages: 600,
      },
      {
        title: 'Война миров',
        author: 'Г. Уэллс',
        category: 'фантастика',
        pages: 225,
      },
      {
        title: 'Шерлок Холмс',
        author: 'А. Конан Дойл',
        category: 'детектив',
        pages: 300,
      },
      {
        title: 'Властелин колец',
        author: 'Дж. Толкиен',
        category: 'фэнтези',
        pages: 800,
      },
      {
        title: 'Над пропастью во ржи',
        author: 'Д. Д. Сэлинджер',
        category: 'Роман',
        pages: 277,
      },
    ])
    .returning('id');

  await knex('BookShelf').insert([
    { book_id: bookIds[0], shelf_id: shelfIds[0] },
    { book_id: bookIds[1], shelf_id: shelfIds[0] },
    { book_id: bookIds[2], shelf_id: shelfIds[0] },
    { book_id: bookIds[4], shelf_id: shelfIds[0] },
    { book_id: bookIds[5], shelf_id: shelfIds[0] },

    { book_id: bookIds[0], shelf_id: shelfIds[1] },
    { book_id: bookIds[2], shelf_id: shelfIds[1] },
    { book_id: bookIds[6], shelf_id: shelfIds[1] },
    { book_id: bookIds[5], shelf_id: shelfIds[1] },
  ]);
}
