'use strict';

const express = require('express');
const router = express.Router();

const Notification = require('../database/models/Notification');

const { getUserFromJwt, getJwtFromRequest } = require('./services/get-user-auth');

router.get('/notifications', async (req, res) => {
  const jwt = getJwtFromRequest(req);
  const user = await getUserFromJwt(jwt);

  const notifications = await Notification.findAll({
    where: {
      UserId: user.id
    }
  });

  res.status(200).send({
    notifications: notifications
  });
});

module.exports = router;
