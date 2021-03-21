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
    }
];
router.use(unless(unlessPaths, middleware));

const { createUser } = require('./services/create-user');
const { createUserAuth } = require('./services/create-user-auth');

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
    const token = await createUserAuth(
        req.body.username, req.body.password
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
});

module.exports = router;