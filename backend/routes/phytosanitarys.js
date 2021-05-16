'use strict';

const express = require('express');
const router = express.Router();

const Phytosanitary = require('../database/models/Phytosanitary');

router.get('/phytosanitary', async (req, res) => {
  const phytosanitarys = await Phytosanitary.findAll({
    order: [
      ['createdAt', 'DESC'],
    ],
  });

  res.status(200).send({
    phytosanitarys: phytosanitarys
  });
});

module.exports = router;
