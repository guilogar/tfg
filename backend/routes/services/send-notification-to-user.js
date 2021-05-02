const FirebaseToken = require('../../database/models/FirebaseToken');

const sendNotificationToUser = async (userId, notification) => {
  const firebaseTokens = await FirebaseToken.findAll({
    where: {
      UserId: userId
    }
  });

  const admin = require('firebase-admin');
  const serviceAccount = require('../../firebaseServiceAccount.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  for(const firebaseToken of firebaseTokens)
  {
    // This registration token comes from the client FCM SDKs.
    const registrationToken = firebaseToken.token;

    const message = {
      notification: notification
    };

    try {
      const response = await admin.messaging().sendToDevice(registrationToken, message, {
        priority: "high",
        timeToLive: 60 * 60 * 24
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = { sendNotificationToUser };
