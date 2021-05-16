'use strict';

const express = require('express');
const router = express.Router();

const { Op } = require('sequelize');

const Event = require('../database/models/Event');
const UserEvent = require('../database/models/UserEvent');
const { getUserFromJwt, getJwtFromRequest } = require('../routes/services/get-user-auth');
const { getFilterEvent } = require('./constans/filters');

router.get('/events', async (req, res) => {
  const id = (req.query.id !== undefined) ? JSON.parse(req.query.id) : undefined;

  const where = (id !== undefined) ? {
    id: id
  } : { };

  const events = await Event.findAll({
    where: where,
    order: [
      ['createdAt', 'DESC'],
    ],
  });

  res.status(200).send({
    events: events
  });
});

router.get('/event-actions', async (req, res) => {
  res.status(200).send({
    actions: [
      'AUTOMATIC', 'MANUAL', 'SETTINGS'
    ]
  });
});

router.get('/user-events', async (req, res) => {
  const id = (req.query.id !== undefined) ? JSON.parse(req.query.id) : undefined;
  const filter = (req.query.filter !== undefined) ? req.query.filter : undefined;

  const jwt = getJwtFromRequest(req);
  const user = await getUserFromJwt(jwt);

  let where = (id !== undefined) ? {
    UserId: user.id,
    id: id
  } : {
    UserId: user.id
  };

  if (filter !== undefined) {
    where[Op.or] = getFilterEvent(filter);
  }

  const events = await UserEvent.findAll({
    where: where,
    include: [
      { model: Event }
    ],
    order: [
      ['createdAt', 'DESC'],
    ],
  });

  res.status(200).send({
    events: events
  });
});

router.post('/user-events', async (req, res) => {
  const jwt = getJwtFromRequest(req);
  const user = await getUserFromJwt(jwt);

  try {
    const userEvent = await UserEvent.create({
      action: req.body.action,
      EventId: req.body.eventId,
      UserId: user.id
    });

    res.status(200).send({
      userEvent: userEvent
    });
  } catch (error) {
    res.status(404).send({
      msg: 'invalid data'
    });
  }
});

router.put('/user-events/:id', async (req, res) => {
  const id = req.params.id;

  const jwt = getJwtFromRequest(req);
  const user = await getUserFromJwt(jwt);

  try {
    let userEvent = await UserEvent.findOne({
      where: {
        id: id,
        UserId: user.id
      }
    });

    userEvent = await userEvent.update({
      action: req.body.action,
      EventId: req.body.eventId
    });

    res.status(200).send({
      userEvent: userEvent
    });
  } catch (error) {
    res.status(404).send({
      msg: 'invalid data'
    });
  }
});

router.delete('/user-events/:id', async (req, res) => {
  const jwt = getJwtFromRequest(req);
  const user = await getUserFromJwt(jwt);

  await UserEvent.destroy({
    where: {
      id: req.params.id,
      UserId: user.id
    }
  });

  res.status(200).send({
    msg: 'destroyed!'
  });
});

module.exports = router;
