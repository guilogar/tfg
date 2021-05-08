'use strict';

const express = require('express');
const router = express.Router();

const Irrigate = require('../database/models/Irrigate');
const FarmableLand = require('../database/models/FarmableLand');
const { getUserFromJwt, getJwtFromRequest } = require('../routes/services/get-user-auth');

router.get('/irrigates', async (req, res) => {
  const id = (req.query.id !== undefined) ? JSON.parse(req.query.id) : undefined;

  const where = (id !== undefined) ? {
    id: id
  } : { };
  const irrigates = await Irrigate.findAll({
    where: where,
    include: [
      { model: FarmableLand }
    ]
  });

  res.status(200).send({
    irrigates: irrigates
  });
});

router.post('/irrigate', async (req, res) => {
  const jwt = getJwtFromRequest(req);
  const user = await getUserFromJwt(jwt);

  try {
    const farm = await FarmableLand.findOne({
      where: {
        id: req.body.farmId,
        UserId: user.id
      }
    });

    if (!farm) throw new Error();

    const irrigate = await Irrigate.create({
      amountWater: req.body.amountWater,
      lengthMinutes: req.body.lengthMinutes,
      FarmableLandId: req.body.farmId
    });

    res.status(200).send({
      irrigate: irrigate
    });
  } catch (error) {
    res.status(404).send({
      msg: 'invalid data'
    });
  }
});

router.put('/irrigate/:id', async (req, res) => {
  const id = req.params.id;

  const jwt = getJwtFromRequest(req);
  const user = await getUserFromJwt(jwt);

  try {
    const farm = await FarmableLand.findOne({
      where: {
        id: req.body.farmId,
        UserId: user.id
      }
    });

    if (!farm) throw new Error();

    let irrigate = await Irrigate.findOne({
      where: {
        id: id
      }
    });

    irrigate = await irrigate.update({
      amountWater: req.body.amountWater,
      lengthMinutes: req.body.lengthMinutes,
      FarmableLandId: req.body.farmId
    });

    res.status(200).send({
      irrigate: irrigate
    });
  } catch (error) {
    console.log(error)
    res.status(404).send({
      msg: 'invalid data'
    });
  }
});

router.delete('/irrigate/:id', async (req, res) => {
  const jwt = getJwtFromRequest(req);
  const user = await getUserFromJwt(jwt);

  await Irrigate.destroy({
    where: {
      id: req.params.id
    }
  });

  res.status(200).send({
    msg: 'destroyed!'
  });
});

module.exports = router;
