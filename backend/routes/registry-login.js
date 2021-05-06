'use strict';

const express = require('express');
const router = express.Router();

const { middleware, unless } = require('../middleware');
const unlessPaths = [
  {
    path: '/user',
    method: 'POST'
  },
  {
    path: '/login',
    method: 'POST'
  },
  {
    path: '/sessionValid',
    method: 'POST'
  }
];
router.use(unless(unlessPaths, middleware));

const { createUser } = require('./services/create-user');
const { createUserAuth } = require('./services/create-user-auth');
const Auth = require('../database/models/Auth');

router.post('/user', async (req, res) => {
  res.status(200).send({
    user: await createUser(
      req.body.username,
      req.body.password,
      req.body.fullname
    )
  });
});

router.post('/login', async (req, res) => {
  try
  {
  const token = await createUserAuth(
    req.body.username, req.body.password,
    req.body.firebaseToken
  );

  if(token)
  {
    res.status(200).send({
    token: token
    });
  } else
  {
    res.status(404).send({
    msg: 'invalid username or password'
    });
  }
  } catch(err)
  {
  res.status(412).send({
    msg: 'unexpected error'
  });
  }
});

router.post('/sessionValid', async (req, res) => {
  try
  {
    const token = req.body.token;
    const auth = await Auth.findOne({
      where: {
        jwt: token
      }
    });

    if(auth && auth.isValid())
    {
      res.status(200).send({
        msg: 'token valid'
      });
    } else {
      res.status(404).send({
        msg: 'token not valid'
      });
    }
  } catch(err)
  {
    res.status(412).send({
      msg: 'unexpected error'
    });
  }
});

module.exports = router;
