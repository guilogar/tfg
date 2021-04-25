'use strict';

const express = require('express');
const router = express.Router();

const User = require('../database/models/User');
const FarmableLand = require('../database/models/FarmableLand');
const { getUserFromJwt, getJwtFromRequest } = require('../routes/services/get-user-auth');

router.get('/farmableLand', async (req, res) => {
  const id = req.query.id;

  const jwt = getJwtFromRequest(req);
  const user = await getUserFromJwt(jwt);

  const where = (id) ? {
    UserId: user.id, 
    id: id
  } : {
    UserId: user.id
  };
  const farmableLands = await User.findAll({
    where: where
  });

  res.status(200).send({
    msg: 'got it!',
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
  
  let farmableLand = await FarmableLand.findOne({
    where: {
      id: id
    }
  });

  farmableLand = await farmableLand.update({
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
  await FarmableLand.destroy({
    where: {
      id: req.params.id
    }
  });

  res.status(200).send({
    msg: 'destroyed!'
  });
});

module.exports = router;