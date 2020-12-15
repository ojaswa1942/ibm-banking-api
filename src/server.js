const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const routes = require('./routes');
const provideContext = require('./context');

const { db: dbConfig, port } = require('./utils/config');
const logger = require('./utils/logger');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

try {
  mongoose.connect(dbConfig.uri, dbConfig.options);

  app.use(provideContext);

  app.get('/', (req, res) => res.sendStatus(200));
  app.use('/api', routes);
} catch (error) {
  logger({ type: `ERROR` }, `Unhandled Exception@server.js`);
  logger({ type: `ERROR` }, error);
}

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
