'use strict';

const Notification = require('../../database/models/Notification');

const createNotification = async (title, body, userId) => {
  await Notification.create({
    title: title,
    body: body,
    UserId: userId
  });
};

module.exports = {
  createNotification
};
