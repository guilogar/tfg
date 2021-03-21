'use strict';

const express = require('express');
const router = express.Router();

const User = require('../database/models/User');
const Auth = require('../database/models/Auth');
const { Op } = require("sequelize");

const { setPassword } = require('../utils/password');
const { generateToken } = require('../utils/jwt');

const { sumHourToDate } = require('../utils/date');

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

router.post('/user', async (req, res) => {
    const username = req.body.username;
    const { hash, salt } = setPassword(req.body.password);
    const fullname = req.body.fullname;
    
    const user = await User.create({
        username: username,
        password: hash,
        salt: salt,
        fullname: fullname,
        isActive: true
    });

    res.status(200).send({
        user: user
    });
});

router.post('/login', async (req, res) => {
    const username = req.body.username;

    let user = await User.findOne({
        where: {
            username: username
        }
    });

    if(user)
    {
        const { hash } = setPassword(req.body.password, user.salt);
        user = await User.findOne({
            where: {
                username: username,
                password: hash
            }
        });
    }

    if(user)
    {
        let auth = await Auth.findOne({
            where: {
                UserId: user.id,
                expires: {
                    [Op.gt]: new Date()
                }
            }
        });
        
        if(auth && auth.isValid())
        {
            res.status(200).send({
                token: auth.jwt
            });
        } else
        {
            // 1 * 60 * 60 * 1000 = 1 hour
            const { token } = generateToken(
                user.username, user.salt,
                Math.floor(Date.now() / 1000) + (60 * 60)
            );
            auth = await Auth.create({
                jwt: token,
                expires: sumHourToDate(new Date(), 1),
                UserId: user.id
            });

            res.status(200).send({
                token: token
            });
        }
    } else
    {
        res.status(404).send({
            msg: 'data not found'
        });
    }
});

module.exports = router;