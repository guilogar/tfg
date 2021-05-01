const FirebaseToken = require('../../database/models/FirebaseToken');

const sendNotificationToUser = async (userId) => {
  const firebaseTokens = await FirebaseToken.findAll({
    where: {
      UserId: userId
    }
  });

  for(const firebaseToken of firebaseTokens)
  {
    const admin = require('firebase-admin');
    const serviceAccount = require('../../firebaseServiceAccount.json');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });

    // This registration token comes from the client FCM SDKs.
    const registrationToken = firebaseToken.token;

    const message = {
      notification: {
        title: 'titulo',
        body: 'contenido'
      },
      android: {
        notification: {
          icon: 'stock_ticker_update',
          color: '#7e55c3'
        }
      }
    };

    // Send a message to the device corresponding to the provided
    // registration token.

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
