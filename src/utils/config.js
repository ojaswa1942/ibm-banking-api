require('dotenv').config();

const { PORT, DBHOST, DBUSER, DBNAME, DBPASSWORD, JWT_SECRET } = process.env;

module.exports = {
  port: PORT || 3013,
  db: {
    uri: `mongodb+srv://${DBUSER}:${DBPASSWORD}@${DBHOST}/${DBNAME}?retryWrites=true&w=majority`,
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
