import * as express from 'express';
import dbConfig from '../../config.database';
import logger from '../common/logger';
import BackupDatabase from '../lib/BackupDatabase';
import _ from 'lodash';

function getAll(req, res) {
  var databases = [];
  _.forEach(dbConfig, item => {
    databases.push({
      id: item.id,
      title: item.title,
      type: item.type,
    });
  });
  res.json(databases);
}

function getById(req, res) {
  const database_id = req.params.database_id;
  const found = _.find(dbConfig, { id: database_id });
  if (!found) {
    return res.status(404).send();
  } else {
    return res.json(dbConfig);
  }
}

function dumpById(req, res) {
  const database_id = req.params.database_id;
  const databaseConfig = _.find(dbConfig, { id: database_id });
  if (!databaseConfig) {
    logger.info(req, 'database_id not found');
    return res.status(404).send('database id is not found');
  }

  const db_backup = new BackupDatabase(databaseConfig);
  db_backup.backup(function(error, result) {
    if (error) {
      logger.info('db_backup error', error);
      return res.status(500).json(error);
    }
    return res.status(200).json(result);
  });
}

export default express
  .Router()
  .get('/', getAll)
  .get('/:database_id', getById)
  .post('/dump/:database_id', dumpById);
