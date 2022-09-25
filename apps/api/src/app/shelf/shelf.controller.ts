import express from 'express';
import { knex } from '../../db/knex';
import { Shelf } from '../models/shelf';
import { Book } from '../models/book';

const router = express.Router();

router.get('/list', async (req, res) => {
  const userId = req.user.id;

  const shelves = await knex
    .select('Shelf.id', 'Shelf.name', 'Book.title', 'BookShelf.created_at')
    .where({ user_id: userId })
    .from<Shelf>('Shelf')
    .leftOuterJoin('BookShelf', 'Shelf.id', 'BookShelf.shelf_id')
    .leftOuterJoin<Book>('Book', 'BookShelf.book_id', 'Book.id');

  res.send({
    shelves,
  });
});

export default router;
