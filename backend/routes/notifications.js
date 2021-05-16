'use strict';

const express = require('express');
const router = express.Router();

const { Op } = require('sequelize');

const Notification = require('../database/models/Notification');
const { getUserFromJwt, getJwtFromRequest } = require('./services/get-user-auth');
const { getFilterNotification } = require('./constans/filters');

router.get('/notifications', async (req, res) => {
  const jwt = getJwtFromRequest(req);
  const user = await getUserFromJwt(jwt);
  const filter = (req.query.filter !== undefined) ? req.query.filter : undefined;

  let where = {
    UserId: user.id
  };

  if (filter !== undefined) {
    where[Op.or] = getFilterNotification(filter);
  }

  const notifications = await Notification.findAll({
    where: where,
    order: [
      ['createdAt', 'DESC'],
    ],
  });

  res.status(200).send({
    notifications: notifications
  });
});

module.exports = router;
