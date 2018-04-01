import PouchDB from 'pouchdb';

const remoteDB = new PouchDB('http://localhost:5984/messages');
const localDB = new PouchDB('messages');

// 同步数据库
localDB.sync(remoteDB, {  
  live: true,
  retry: true
});

export default localDB;