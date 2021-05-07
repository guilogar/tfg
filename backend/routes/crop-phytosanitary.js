'use strict';

const express = require('express');
const router = express.Router();

const FarmableLand = require('../database/models/FarmableLand');
const FarmableLandCrop = require('../database/models/FarmableLandCrop');
const Crop = require('../database/models/Crop');
const CropPhytosanitary = require('../database/models/CropPhytosanitary');
const Phytosanitary = require('../database/models/Phytosanitary');

const { getUserFromJwt, getJwtFromRequest } = require('../routes/services/get-user-auth');

router.get('/cropPhytosanitary', async (req, res) => {
  const farmId = (req.query.farmId !== undefined) ? JSON.parse(req.query.farmId) : undefined;
  const cropId = (req.query.cropId !== undefined) ? JSON.parse(req.query.cropId) : undefined;

  const jwt = getJwtFromRequest(req);
  const user = await getUserFromJwt(jwt);

  const where = (farmId !== undefined) ? {
    UserId: user.id,
    id: farmId
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

    const where = (cropId !== undefined) ? {
      CropId: cropId,
      FarmableLandId: farm.id
    } : {
      FarmableLandId: farm.id
    };

    const farmsCrops = await FarmableLandCrop.findAll({
      where
    });

    for(const farmCrop of farmsCrops) {
      const crops = await Crop.findAll({
        where: {
          id: farmCrop.CropId
        }
      });

      for(const crop of crops) {
        let cropFarmableLand = crop.toJSON();

        const cropsPhytosanitary = await CropPhytosanitary.findAll({
          where: {
            FarmableLandId: farmableLand.id,
            CropId: cropFarmableLand.id
          }
        });

        let phytosanitaryIds = [];

        for (const cropPhytosanitary of cropsPhytosanitary) {
          phytosanitaryIds.push(cropPhytosanitary.PhytosanitaryId);
        }

        const phytosanitarys = await Phytosanitary.findAll({
          where: {
            id: phytosanitaryIds
          }
        });

        cropFarmableLand.phytosanitarys = [];
        for (const phytosanitary of phytosanitarys) {
          cropFarmableLand.phytosanitarys.push(phytosanitary);
        }
        farmableLand.crops.push(cropFarmableLand);
      }
    }

    farmableLands.push(farmableLand);
  }

  res.status(200).send({
    lands: farmableLands
  });
});

router.post('/cropPhytosanitary', async (req, res) => {
  const jwt = getJwtFromRequest(req);
  const user = await getUserFromJwt(jwt);

  try {
    const farm = await FarmableLand.findOne({
      where: {
        id: req.body.farmId,
        UserId: user.id
      }
    });

    if(farm) {
      await CropPhytosanitary.create({
        FarmableLandId: req.body.farmId,
        CropId: req.body.cropId,
        PhytosanitaryId: req.body.phytosanitaryId
      });
      req.url = `/cropPhytosanitary?farmId=${req.params.farmId}&cropId=${req.body.cropId}`
      req.method = `GET`;
      return router.handle(req, res);
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

router.put('/cropPhytosanitary/:farmId/:cropId', async (req, res) => {
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
      await CropPhytosanitary.destroy({
        where: {
          FarmableLandId: req.params.farmId,
          CropId: req.params.cropId,
        }
      });

      const phytosanitarys = req.body.phytosanitarys;
      for (const phytosanitary of phytosanitarys) {
        await CropPhytosanitary.create({
          FarmableLandId: req.params.farmId,
          CropId: req.body.cropId,
          PhytosanitaryId: phytosanitary.id
        });
      }
      req.url = `/cropPhytosanitary?farmId=${req.params.farmId}&cropId=${req.body.cropId}`
      req.method = `GET`;
      return router.handle(req, res);
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

router.delete('/cropPhytosanitary/:farmId', async (req, res) => {
  // const jwt = getJwtFromRequest(req);
  // const user = await getUserFromJwt(jwt);

  // await FarmableLandCrop.destroy({
  //   where: {
  //     FarmableLandId: req.params.farmId,
  //     UserId: user.id
  //   }
  // });

  // res.status(200).send({
  //   msg: 'destroyed!'
  // });
});

module.exports = router;
