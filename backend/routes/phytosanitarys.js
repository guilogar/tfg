'use strict';

const express = require('express');
const router = express.Router();

const Phytosanitary = require('../database/models/Phytosanitary');

const { getUserFromJwt, getJwtFromRequest } = require('../routes/services/get-user-auth');

router.get('/phytosanitary', async (req, res) => {
  const phytosanitarys = await Phytosanitary.findAll();

  res.status(200).send({
    phytosanitarys: phytosanitarys
  });
});

module.exports = router;
