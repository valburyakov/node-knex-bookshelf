import * as Knex from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex) {
  await knex('Shelf').del();
  await knex('User').del();

  const userIds = await knex('User').insert([
    {name: 'User1', email: 'user1@mail.com'},
    {name: 'User2', email: 'user2@mail.com'}
  ]).returning('id');


  await knex('Shelf').insert([
    {name: 'Shelf 1', user_id: userIds[0] },
    {name: 'Shelf 2', user_id: userIds[1] }
  ]);


  const bookIds = await knex('Book').insert([
    {title: '', author: '', category: '', pages: 0  },
    {title: '', author: '', category: '', pages: 0  },
    {title: '', author: '', category: '', pages: 0  },
    {title: '', author: '', category: '', pages: 0  },
    {title: '', author: '', category: '', pages: 0  },
    {title: '', author: '', category: '', pages: 0  },
    {title: '', author: '', category: '', pages: 0  }
  ])

}
