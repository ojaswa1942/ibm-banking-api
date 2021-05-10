require('dotenv').config();

const {
  PORT,
  DBHOST,
  DBUSER,
  DBNAME,
  MONGO_REPLICA_SET_NAME,
  DBPASSWORD,
  JWT_SECRET,
} = process.env;

const connectionURI = `mongodb://${DBUSER}:${DBPASSWORD}@${DBHOST}/${DBNAME}?authSource=${DBNAME}&retryWrites=true&w=majority&replicaSet=${MONGO_REPLICA_SET_NAME}`;
// const connectionURI = `mongodb://${DBUSER}:${DBPASSWORD}@${DBHOST}/${DBNAME}?authSource=${DBNAME}`;

console.log(connectionURI);

module.exports = {
  port: PORT || 3013,
  db: {
    uri: connectionURI,
    database: DBNAME,
    options: {
      useNewUrlParser: true,
      useCreateIndex: true,
      // useUnifiedTopology: true,
      useFindAndModify: false,
    },
  },
  secrets: {
    jwt: JWT_SECRET,
  },
};
