'use strict';

const express = require('express');
const router = express.Router();

const UserSettings = require('../database/models/UserSettings');
const { getUserFromJwt, getJwtFromRequest } = require('../routes/services/get-user-auth');

router.get('/languages', async (req, res) => {
  res.status(200).send({
    languages: ['es', 'en']
  });
});

router.get('/eventActions', async (req, res) => {
  res.status(200).send({
    actions: ['AUTOMATIC', 'MANUAL']
  });
});

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

router.put('/settings', async (req, res) => {
  const jwt = getJwtFromRequest(req);
  const user = await getUserFromJwt(jwt);

  try {
    let userSettings = await UserSettings.findOne({
      where: {
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

module.exports = router;
