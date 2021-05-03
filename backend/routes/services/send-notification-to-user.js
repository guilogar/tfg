const admin = require('firebase-admin');
const serviceAccount = require('../../firebaseServiceAccount.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const FirebaseToken = require('../../database/models/FirebaseToken');

const sendNotificationToUser = async (userId, notification) => {
  const firebaseTokens = await FirebaseToken.findAll({
    where: {
      UserId: userId
    }
  });

  let responses = [];
  for(const firebaseToken of firebaseTokens)
  {
    // This registration token comes from the client FCM SDKs.
    const registrationToken = firebaseToken.token;

    const message = {
      notification: notification
    };

    responses.push(
      await admin.messaging().sendToDevice(registrationToken, message, {
        priority: "high",
        timeToLive: 60 * 60 * 24
      })
    );
  }

  return responses;
};

module.exports = { sendNotificationToUser };
