'use strict';

const express = require('express');
const router = express.Router();

const { Op } = require('sequelize');
const sequelize = require('../database/sequelize');

const FarmableLand = require('../database/models/FarmableLand');
const FarmableLandCrop = require('../database/models/FarmableLandCrop');
const Crop = require('../database/models/Crop');

const { getUserFromJwt, getJwtFromRequest } = require('../routes/services/get-user-auth');
const { getFilterCrop } = require('./constans/filters');

router.get('/farmableLandCrop', async (req, res) => {
  const farmId = (req.query.farmId !== undefined) ? JSON.parse(req.query.farmId) : undefined;
  const filter = (req.query.filter !== undefined) ? req.query.filter : undefined;

  const jwt = getJwtFromRequest(req);
  const user = await getUserFromJwt(jwt);

  let where = {};

  if(farmId !== undefined) {
    where[Op.and] = [
      sequelize.where(
        sequelize.cast(sequelize.col('FarmableLand.id'), 'int'),
        {
          [Op.eq]: farmId
        }
      ),
    ];
  }

  if (filter !== undefined) {
    where[Op.or] = getFilterCrop(filter);
    where[Op.and] = [
      sequelize.where(
        sequelize.cast(sequelize.col('FarmableLand.UserId'), 'int'),
        {
          [Op.eq]: user.id
        }
      ),
    ];
  }

  const farmsCrops = await FarmableLandCrop.findAll({
    where: where,
    include: [
      { model: FarmableLand },
      { model: Crop },
    ],
    order: [
      ['createdAt', 'DESC'],
    ],
  });

  let farmIds = [];
  for (const farmCrop of farmsCrops) {
    if (!farmIds.includes(farmCrop.FarmableLandId)) {
      farmIds.push(farmCrop.FarmableLandId);
    }
  }

  let farmableLands = [];
  for (const farmableLandId of farmIds) {
    const farm = (await FarmableLand.findOne({
      where: {
        id: farmableLandId
      }
    })).toJSON();

    const fCrops = await FarmableLandCrop.findAll({
      where: {
        FarmableLandId: farmableLandId
      },
      include: [
        { model: Crop }
      ]
    });

    farm.crops = fCrops.map((fCrop) => {
      return fCrop.Crop.toJSON();
    });

    farmableLands.push(farm);
  }

  res.status(200).send({
    lands: farmableLands
  });
});

router.post('/farmableLandCrop', async (req, res) => {
  const jwt = getJwtFromRequest(req);
  const user = await getUserFromJwt(jwt);

  try {
    const farm = await FarmableLand.findOne({
      id: req.body.farmId,
      UserId: user.id
    });

    if(farm) {
      const farmableLandCrop = await FarmableLandCrop.create({
        FarmableLandId: req.body.farmId,
        CropId: req.body.cropId
      });
      res.status(200).send({
        farmableLandCrop: farmableLandCrop
      });
    } else {
      res.status(404).send({
        error: 'not farm allowed'
      });
    }
  } catch (error) {
    res.status(412).send({
      error: 'unknow error'
    });
  }
});

router.put('/farmableLandCrop/:farmId', async (req, res) => {
  const jwt = getJwtFromRequest(req);
  const user = await getUserFromJwt(jwt);

  try {
    let farm = await FarmableLand.findOne({
      where: {
        id: req.params.farmId,
        UserId: user.id
      }
    });

    if(farm) {
      await FarmableLandCrop.destroy({
        where: {
          FarmableLandId: req.params.farmId
        }
      });

      farm = await FarmableLand.findOne({
        where: {
          id: req.body.farmId,
          UserId: user.id
        }
      });

      if(farm) {
        const crops = req.body.crops;

        for (const crop of crops) {
          await FarmableLandCrop.create({
            FarmableLandId: req.body.farmId,
            CropId: crop.id
          });
        }
        req.url = `/farmableLandCrop?id=${req.body.farmId}`
        req.method = `GET`;
        return router.handle(req, res);
      } else {
        res.status(404).send({
          error: 'not farm allowed'
        });
      }
    } else {
      res.status(404).send({
        error: 'not farm allowed'
      });
    }
  } catch (error) {
    console.log(error);
    res.status(412).send({
      error: 'unknow error'
    });
  }
});

module.exports = router;
