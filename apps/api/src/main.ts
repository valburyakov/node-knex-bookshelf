import express from 'express';
import bodyParser from 'body-parser';
import { createDb } from './db/knex';


export async function main() {

  const app = express();
  const db = await createDb();

  db.select().from('User').then(console.log);

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  const port = process.env.PORT || 3333;
  const server = app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/api');
  });
  server.on('error', console.error);
}

main()
