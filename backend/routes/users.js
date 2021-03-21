'use strict';

const express = require('express');
const router = express.Router();

const User = require('../database/models/User');
const sequelize = require('../database/sequelize');

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