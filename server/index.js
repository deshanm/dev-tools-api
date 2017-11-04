import config from '../config';
import logger from './common/logger';
import { stream } from './common/logger';
import routes from './routes';
import Express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import cookieParser from 'cookie-parser';
import swaggerify from './swagger';
import morgan from 'morgan';

process.on('uncaughtException', function(err) {
  logger.error('uncaughtException', err);
  logger.debug(
    'We got uncaughtException',
    'Sever will be failed in production. please fix this issue'
  );
  process.exit(1);
});
const app = new Express();

app.use(require('morgan')(':method :url :status :response-time ms', { stream: stream }));
class ExpressServer {
  constructor() {
    const root = path.normalize(`${__dirname}/..`);
    app.set('appPath', `${root}client`);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser(config.SESSION_SECRET));
    app.use(Express.static(`${root}/public`));
  }

  router(routes) {
    swaggerify(app, routes);
    return this;
  }

  listen(port = config.PORT) {
    const welcome = p => () =>
      logger.info(
        `up and running in ${config.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${p}`
      );
    http.createServer(app).listen(port, welcome(port));
    return app;
  }
}

export default new ExpressServer().router(routes).listen(config.PORT);
