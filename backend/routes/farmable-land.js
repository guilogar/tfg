'use strict';

const express = require('express');
const router = express.Router();

const FarmableLand = require('../database/models/FarmableLand');
const { getUserFromJwt, getJwtFromRequest } = require('../routes/services/get-user-auth');

router.get('/farmableLand', async (req, res) => {
  const id = (req.query.id !== undefined) ? JSON.parse(req.query.id) : undefined;

  const jwt = getJwtFromRequest(req);
  const user = await getUserFromJwt(jwt);

  const where = (id !== undefined) ? {
    UserId: user.id,
    id: id
  } : {
    UserId: user.id
  };
  const farmableLands = await FarmableLand.findAll({
    where: where
  });

  res.status(200).send({
    lands: farmableLands
  });
});

router.get('/farmableLandTypes', async (req, res) => {
  res.status(200).send({
    types: [
      'Irrigation', 'DryLand',
      'GreenHourse', 'OpenLand'
    ]
  });
});

router.post('/farmableLand', async (req, res) => {
  const jwt = getJwtFromRequest(req);
  const user = await getUserFromJwt(jwt);

  const farmableLand = await FarmableLand.create({
    name: req.body.name,
    type: req.body.type,
    image: req.body.image,
    haveIOT: req.body.haveIOT,
    area: req.body.area,
    isSquare: req.body.isSquare,
    UserId: user.id
  });

  res.status(200).send({
    farmableLand: farmableLand
  });
});

router.put('/farmableLand/:id', async (req, res) => {
  const id = req.params.id;

  const jwt = getJwtFromRequest(req);
  const user = await getUserFromJwt(jwt);

  let farmableLand = await FarmableLand.findOne({
    where: {
      id: id,
      UserId: user.id
    }
  });

  farmableLand = await farmableLand.update({
    name: req.body.name,
    type: req.body.type,
    image: req.body.image,
    haveIOT: req.body.haveIOT,
    area: req.body.area,
    isSquare: req.body.isSquare
  });

  res.status(200).send({
    farmableLand: farmableLand
  });
});

router.delete('/farmableLand/:id', async (req, res) => {
  const jwt = getJwtFromRequest(req);
  const user = await getUserFromJwt(jwt);

  await FarmableLand.destroy({
    where: {
      id: req.params.id,
      UserId: user.id
    }
  });

  res.status(200).send({
    msg: 'destroyed!'
  });
});

module.exports = router;
