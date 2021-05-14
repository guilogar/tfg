const express = require('express');
const app = express();
const logger = require('morgan');
const http = require('http');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const baseAPI = '/api/v1';
const cors = require('cors');

const args = process.argv.slice(2);
process.env.ENVFILE = (args[0]) ? args[0] : '.env';

const dotenv = require('dotenv');
dotenv.config({ path: process.env.ENVFILE });

app.use(cors({
  origin: '*'
}));
app.use(bodyParser.json({
  limit: '1024mb'
}));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '1024mb'
}));

const routes = require('./routes/routes');

for (const route of routes) {
  app.use(baseAPI, route);
}

const sequelize = require('./database/sequelize');

(async () => {
  await sequelize.sync();
})();

const { initCronTab } = require('./cron-tab');
initCronTab();

const server = http.createServer(app);
server.listen(PORT, function() {
    console.log('Server up and running on localhost:' + PORT);
});
