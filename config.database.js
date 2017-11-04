const MONGO = 'MONGO';
const MYSQL = 'MYSQL';

const databases = [
  {
    id: 'sample_database',
    title: 'Sample Database',
    uri: 'mongodb://localhost:27017/temperatures',
    type: MONGO,
  },
];

export default databases;
