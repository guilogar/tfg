'use strict';

const express = require('express');
const router = express.Router();

const User = require('../database/models/User');
const sequelize = require('../database/sequelize');

module.exports = router;
