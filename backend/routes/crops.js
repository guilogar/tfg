'use strict';

const express = require('express');
const router = express.Router();

const Crop = require('../database/models/Crop');

const { getUserFromJwt, getJwtFromRequest } = require('../routes/services/get-user-auth');

router.get('/crop', async (req, res) => {
  const crops = await Crop.findAll({
    order: [
      ['createdAt', 'DESC'],
    ],
  });

  res.status(200).send({
    crops: crops
  });
});

module.exports = router;
