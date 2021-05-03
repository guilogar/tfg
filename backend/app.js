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

const registryLogin = require('./routes/registry-login');
const users = require('./routes/users');
const farmableLand = require('./routes/farmable-land');

app.use(baseAPI, registryLogin);
app.use(baseAPI, users);
app.use(baseAPI, farmableLand);

const sequelize = require('./database/sequelize');

(async () => {
  await sequelize.sync();
})();

// const { sendNotificationToUser } = require('./routes/services/send-notification-to-user');
// (async () => {
//   await sendNotificationToUser(1, {
//     title: 'Evento X',
//     body: 'El Evento X ha sido disparado. Clicke aquí para mas información'
//   });
// })();

// # ┌────────────── second (optional)
// # │ ┌──────────── minute
// # │ │ ┌────────── hour
// # │ │ │ ┌──────── day of month
// # │ │ │ │ ┌────── month
// # │ │ │ │ │ ┌──── day of week
// # │ │ │ │ │ │
// # │ │ │ │ │ │
// # * * * * * *
const cron = require('node-cron');
const { getEventFromCosmos, getAllEventFromCosmos } = require('./routes/services/get-event-from-cosmos');
const { checkEvent } = require('./routes/services/check-event');

cron.schedule('* * * * * *', async () => {
  const items = await getAllEventFromCosmos();
  const events = await checkEvent(items);
  console.log(events);
});

const server = http.createServer(app);
server.listen(PORT, function() {
    console.log('Server up and running on localhost:' + PORT);
});
