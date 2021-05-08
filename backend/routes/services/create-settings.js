const UserSettings = require('../../database/models/UserSettings');

const createSettings = async(
  userId, defaultLanguage,
  backgroundColor, defaultEventAction
) => {
  return await UserSettings.create({
    UserId: userId,
    defaultLanguage: defaultLanguage,
    backgroundColor: backgroundColor,
    defaultEventAction: defaultEventAction
  });
};

module.exports = {
  createSettings
};
