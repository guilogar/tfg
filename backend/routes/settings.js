'use strict';

const express = require('express');
const router = express.Router();

const UserSettings = require('../database/models/UserSettings');
const { getUserFromJwt, getJwtFromRequest } = require('../routes/services/get-user-auth');

router.get('/settings', async (req, res) => {
  const jwt = getJwtFromRequest(req);
  const user = await getUserFromJwt(jwt);

  const userSettings = await UserSettings.findOne({
    where: {
      UserId: user.id
    }
  });

  res.status(200).send({
    userSettings: userSettings
  });
});

router.post('/settings', async (req, res) => {
  const jwt = getJwtFromRequest(req);
  const user = await getUserFromJwt(jwt);

  try {
    const userSettings = await UserSettings.create({
      backgroundColor: req.body.backgroundColor,
      defaultLanguage: req.body.defaultLanguage,
      defaultEventAction: req.body.defaultEventAction,
      UserId: user.id
    });

    res.status(200).send({
      userSettings: userSettings
    });
  } catch (error) {
    res.status(404).send({
      msg: 'invalid data'
    });
  }
});

router.put('/settings/:id', async (req, res) => {
  const id = req.params.id;

  const jwt = getJwtFromRequest(req);
  const user = await getUserFromJwt(jwt);

  try {
    let userSettings = await UserSettings.findOne({
      where: {
        id: id,
        UserId: user.id
      }
    });

    userSettings = await userSettings.update({
      backgroundColor: req.body.backgroundColor,
      defaultLanguage: req.body.defaultLanguage,
      defaultEventAction: req.body.defaultEventAction
    });

    res.status(200).send({
      userSettings: userSettings
    });
  } catch (error) {
    res.status(404).send({
      msg: 'invalid data'
    });
  }
});

router.delete('/settings/:id', async (req, res) => {
  const jwt = getJwtFromRequest(req);
  const user = await getUserFromJwt(jwt);

  await UserSettings.destroy({
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
