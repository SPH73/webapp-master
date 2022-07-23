require('dotenv').config();
const mongodbStore = require('connect-mongodb-session');

const createSessionStore = session => {
  const MongoDBStore = mongodbStore(session);

  const sessionStore = new MongoDBStore({
    uri: process.env.ATLAS_URI,
    databaseName: 'seguroDb',
    collection: 'sessions',
  });
  return sessionStore;
};

const createSessionConfig = sessionStore => {
  return {
    secret: process.env.SESSION, //client unable to fake a session
    resave: false, //only update the session if data changes
    saveUninitialized: false, //session stored only if data in the session
    store: sessionStore, //where the session data is stored
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, //would expire the session after 30 days if set
      sameSite: 'none',
    },
  };
};
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1); // trust first proxy
  sessionConfig.cookie.secure = true; // serve secure cookies
}

module.exports = {
  createSessionStore: createSessionStore,
  createSessionConfig: createSessionConfig,
};
