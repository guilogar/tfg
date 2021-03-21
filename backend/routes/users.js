'use strict';

const express = require('express');
const router = express.Router();

const User = require('../database/models/User');
const Auth = require('../database/models/Auth');
const MethodPay = require('../database/models/MethodPay');
const sequelize = require('../database/sequelize');

const { setPassword, validPassword } = require('../utils/password');
const { generateToken, verifyToken } = require('../utils/jwt');

const { sumHourToDate } = require('../utils/date');

router.get('/user', async (req, res) => {
    const username = req.query.username;

    const user = await User.findOne({
        where: {
            username: username
        }
    });

    await sequelize.sync();
    
    res.status(200).send({
        msg: 'got it!',
        user: user
    });
});

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
        const { token, time } = generateToken(user.username, user.salt, 60 * 60);

        const auth = await Auth.create({
            jwt: token,
            expires: sumHourToDate(new Date(), 1),
            userId: user.id
        });

        auth.isValid();

        res.status(200).send({
            token: token,
            timeActive: time
        });
    } else
    {
        res.status(404).send({
            msg: 'data not found'
        });
    }
});

router.put('/user/:id', async (req, res) => {
    res.status(200).send({
        msg: 'updated!'
    });
});

router.delete('/user/:username', async (req, res) => {
    const confirm = await User.destroy({
        where: {
            username: req.params.username
        }
    });

    res.status(200).send({
        msg: 'destroyed!'
    });
});

module.exports = router;