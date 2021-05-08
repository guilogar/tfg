'use strict';

const express = require('express');
const router = express.Router();

const Event = require('../database/models/Event');
const User = require('../database/models/User');
const UserEvent = require('../database/models/UserEvent');
const { getUserFromJwt, getJwtFromRequest } = require('../routes/services/get-user-auth');

router.get('/events', async (req, res) => {
  const id = (req.query.id !== undefined) ? JSON.parse(req.query.id) : undefined;

  const where = (id !== undefined) ? {
    id: id
  } : { };
  const events = await Event.findAll({
    where: where
  });

  res.status(200).send({
    events: events
  });
});

router.get('/event-actions', async (req, res) => {
  res.status(200).send({
    actions: [
      'AUTOMATIC', 'MANUAL'
    ]
  });
});

router.get('/user-events', async (req, res) => {
  const id = (req.query.id !== undefined) ? JSON.parse(req.query.id) : undefined;

  const jwt = getJwtFromRequest(req);
  const user = await getUserFromJwt(jwt);

  const where = (id !== undefined) ? {
    UserId: user.id,
    id: id
  } : {
    UserId: user.id
  };
  const events = await UserEvent.findAll({
    where: where,
    include: [
      { model: Event }
    ]
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
      minValue: req.body.minValue,
      maxValue: req.body.maxValue,
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
      minValue: req.body.minValue,
      maxValue: req.body.maxValue,
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
