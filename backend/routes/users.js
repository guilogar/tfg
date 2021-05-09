'use strict';

const express = require('express');
const router = express.Router();

const { getUserFromJwt, getJwtFromRequest } = require('../routes/services/get-user-auth');

router.get('/user/fullname', async (req, res) => {
  const jwt = getJwtFromRequest(req);
  const user = await getUserFromJwt(jwt);

  res.status(200).send({
    fullname: user.fullname
  });
});

module.exports = router;
