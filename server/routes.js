import databaseCtr from './controllers/databaseCtr';

export default function routes(app) {
  app.use('/api/v1/databases', databaseCtr);
}
