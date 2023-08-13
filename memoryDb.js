const { MongoMemoryServer } = require('mongodb-memory-server');

let dbUrl = '';
let mongod;
const dbName = 'meteor';
const startDb = async () => {
  mongod = await MongoMemoryServer.create({
    instance: {
      port: 27017,
      auth: true,
    },
    auth: {
      customRootName: 'mongo',
      customRootPwd: 'mongo',
    },
  });
  dbUrl = mongod.getUri();
  process.env.DATABASE_URL = `${dbUrl}${dbName}`;
  console.trace(`Start mongodb-memory-server`, `${dbUrl}${dbName}`);
};

// const stopDb = async () => {
//   await mongod.stop();
//   console.trace(`Stop mongodb-memory-server`, `${dbUrl}${dbName}`);
// };

startDb();
