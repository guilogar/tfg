'use strict';

const express = require('express');
const router = express.Router();

const { sendNotificationToUser } = require('./routes/services/send-notification-to-user');
const { getUserFromJwt, getJwtFromRequest } = require('../routes/services/get-user-auth');

router.get('/notification', async (req, res) => {
  const jwt = getJwtFromRequest(req);
  const user = await getUserFromJwt(jwt);

  const notifications = [];
  // TODO: set notification status to SEND

  res.status(200).send({
    notifications: notifications
  });
});

router.post('/notification', async (req, res) => {
  const jwt = getJwtFromRequest(req);
  const user = await getUserFromJwt(jwt);

  // TODO: insert notification in model
  await sendNotificationToUser(user.id, {
    title: 'Evento X',
    body: 'El Evento X ha sido disparado. Clicke aquí para mas información'
  });
  // TODO: set notification status to SEND

  res.status(200).send({
    notification: req.body
  });
});
