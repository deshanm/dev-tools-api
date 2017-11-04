'use strict';
import mongoBackup from 'mongodb-backup';
import mysqlDump from 'mysqldump';
import tar from 'tar-fs';
import fs from 'fs';
import moment from 'moment';
import logger from '../common/logger';
import { BACKUP_DIR } from '../../config';

/**
 * Backup Files should be saved with a UTC timestamp.
 * @return {String}
 */
function fileTimeStamp() {
  return moment()
    .utc()
    .format('YYYY-MM-D_h-mm-ss-a');
}

/**
 * Generate File name of the backup
 * @param  {database_id} database_id
 * @return {String}             [description]
 */
function generateFileName(database_id) {
  return `${fileTimeStamp()}__${database_id}.tar`;
}

/**
 * Generate File name of the backup
 * @param  {database_id} database_id
 * @return {String}             [description]
 */
function getFileInfo(result, callback) {
  const filePath = BACKUP_DIR + '/' + result.fileName;
  fs.stat(filePath, function(err, stat) {
    if (err) {
      logger.error('getFileInfo', filePath, err);
      // we go error while reading file... but we just send the result because
      // we created backup sucessfully
      return callback(null, result);
    }

    result.size = stat.size;
    result.birthtime = stat.birthtime;
    return callback(null, result);
  });
}

/**
 * This is a Database Adaptee. Common Functions should be here
 * @type {[type]}
 */
class DatabaseBackupAdatee {
  constructor() {}
  backup() {}
}

/**
 * THis is mongoDatabase Adapter.
 */
class MongoDBAdapter extends DatabaseBackupAdatee {
  constructor(dbObject) {
    super(dbObject);
    this.config = dbObject;
    logger.debug('MongoDBAdapter', 'this.config', this.config);
  }

  backup(cb) {
    const fileName = generateFileName(this.config.id);
    mongoBackup({
      uri: this.config.uri, // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
      root: BACKUP_DIR,
      tar: fileName,
      callback: err => {
        const result = { id: this.config.id, fileName: fileName, status: true };
        logger.debug('mongobackup callback called', err);

        if (err) {
          logger.error('mongobackup callback called', err);
          result.status = false;
          return cb(result);
        }
        getFileInfo(result, cb);
      },
    });
  }
}
// class MySQLAdapter extends Adaptee {
//   constructor() {
//     super();
//     this.config = config;
//     console.log('Adapter created');
//   }
//
//   backup(cb) {
//     const fileName = '';
//     mysqlDump(
//       {
//         host: 'localhost',
//         user: 'root',
//         password: '',
//         database: 'test',
//         dest: BACKUP_DIR + `/${fileName}`, // destination file
//       },
//       function(err) {
//         var pack = tar
//           .pack('./my-directory', {
//             entries: ['file1', 'subdir/file2'], // only the specific entries will be packed
//           })
//           .pipe(fs.createWriteStream('my-tarball.tar'));
//         return cb(err, null);
//       }
//     );
//   }
// }

/**
 * DatabaseBackup Class
 * @type {MongoDBAdapter}
 */
export default class DatabaseBackup {
  constructor(dbObject) {
    let result;

    switch (dbObject.type) {
      case 'MONGO':
        result = new MongoDBAdapter(dbObject);
        break;
      default:
        result = null;
    }
    return result;
  }
}
