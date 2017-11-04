'use strict';

var config_production = {
  NODE_ENV: 'production',
  PORT: 4700,
  MONGO_URL: 'mongodb://localhost/dev-tools',
  ALLOW_EMAIL: true,
  BACKUP_DIR: __dirname + '/db_backup',
  APP_ID: 'dev-tools-api',
  LOG_LEVEL: 'info',
  REQUEST_LIMIT: '100kb',
  SESSION_SECRET: 'PROD_1DXNtXgtim0KCG03peDV',
  SWAGGER_API_SPEC: '/spec',
};

var config_development = {
  NODE_ENV: 'production',
  PORT: 4700,
  MONGO_URL: 'mongodb://localhost/dev-tools',
  ALLOW_EMAIL: false,
  BACKUP_DIR: __dirname + '/db_backup',
  APP_ID: 'dev-tools-api',
  LOG_LEVEL: 'debug',
  REQUEST_LIMIT: '100kb',
  SESSION_SECRET: 'DEV_XZJrKqekuesvjnBPutr9',
  SWAGGER_API_SPEC: '/spec',
};

var config = {};

if (process.env.NODE_ENV === 'production') {
  config = config_production;
} else {
  config = config_development;
}
config.PORT = process.env.PORT || config.PORT;
config.NODE_ENV = process.env.NODE_ENV || config.NODE_ENV;
config.MONGO_URL = process.env.MONGO_URL || config.MONGO_URL;
config.ALLOW_EMAIL = process.env.ALLOW_EMAIL || config.ALLOW_EMAIL;
config.APP_ID = process.env.APP_ID || config.APP_ID;
config.LOG_LEVEL = process.env.LOG_LEVEL || config.LOG_LEVEL;
config.REQUEST_LIMIT = process.env.REQUEST_LIMIT || config.REQUEST_LIMIT;
config.SESSION_SECRET = process.env.SESSION_SECRET || config.SESSION_SECRET;
config.SWAGGER_API_SPEC = process.env.SWAGGER_API_SPEC || config.SWAGGER_API_SPEC;
config.BACKUP_DIR =
  process.env.BACKUP_DIR || '/Users/deshanmadurajith/Desktop/dev-tools-api/db_backup';
module.exports = config;
