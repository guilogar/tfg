'use strict';

const express = require('express');
const router = express.Router();

const FarmableLand = require('../database/models/FarmableLand');
const FarmableLandCrop = require('../database/models/FarmableLandCrop');
const Crop = require('../database/models/Crop');

const { getUserFromJwt, getJwtFromRequest } = require('../routes/services/get-user-auth');

router.get('/farmableLandCrop', async (req, res) => {
  const id = (req.query.id !== undefined) ? JSON.parse(req.query.id) : undefined;

  const jwt = getJwtFromRequest(req);
  const user = await getUserFromJwt(jwt);

  const where = (id !== undefined) ? {
    UserId: user.id,
    id: id
  } : {
    UserId: user.id
  };

  const farms = await FarmableLand.findAll({
    where
  });

  let farmableLands = [];
  for(const farm of farms) {
    let farmableLand = farm.toJSON();
    farmableLand.crops = [];

    const farmsCrops = await FarmableLandCrop.findAll({
      where: {
        FarmableLandId: farm.id
      }
    });

    for(const farmCrop of farmsCrops) {
      const crops = await Crop.findAll({
        where: {
          id: farmCrop.CropId
        }
      });

      crops.map((crop) => {
        farmableLand.crops.push(crop.toJSON());
      });
    }

    farmableLands.push(farmableLand);
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

router.delete('/farmableLandCrop/:id', async (req, res) => {
  const jwt = getJwtFromRequest(req);
  const user = await getUserFromJwt(jwt);

  await FarmableLandCrop.destroy({
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
