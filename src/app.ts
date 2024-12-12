import express from 'express';
import bodyParser from 'body-parser';
import 'reflect-metadata';
import { AppDataSource } from './ormconfig';
import todoRoutes from './routes/todoRoutes';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/api/todos', todoRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log('Connected to the database');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error during Data Source initialization', error);
  });
