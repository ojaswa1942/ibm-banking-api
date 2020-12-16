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
console.log(DBHOST);
module.exports = {
  port: PORT || 3013,
  db: {
    uri: `mongodb://${DBUSER}:${DBPASSWORD}@${DBHOST}/${DBNAME}?authSource=${DBNAME}&retryWrites=true&w=majority&replicaSet=${MONGO_REPLICA_SET_NAME}`,
    database: DBNAME,
    options: {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
  },
  secrets: {
    jwt: JWT_SECRET,
  },
};
