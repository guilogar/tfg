'use strict';

const dotenv = require('dotenv');
dotenv.config();

// Using the Azure CLI:
// az iot hub device-identity show-connection-string --hub-name {YourIoTHubName} --device-id MyNodeDevice --output table
const connectionString = process.env.CONNECTION_STRING;

const Mqtt = require('azure-iot-device-mqtt').Mqtt;
const DeviceClient = require('azure-iot-device').Client
const Message = require('azure-iot-device').Message;

const client = DeviceClient.fromConnectionString(connectionString, Mqtt);

const getWindDirection = (value) => {
  if (value <= 0.25) {
    return 'N';
  } else if (value <= 0.5) {
    return 'S';
  } else if (value <= 0.75) {
    return 'E';
  } else if (value <= 1) {
    return 'O';
  }
};
// Create a message and send it to the IoT hub
setInterval(async () => {
  const sensorId           = parseInt(1  + (Math.random() * 100));
  const roomTemperature    = 20 + (Math.random() * 15);
  const airHumidity        = 20 + (Math.random() * 20);
  const groundHumidity     = 20 + (Math.random() * 20);
  const litrePerMeterWater = 20 + (Math.random() * 20);
  const windForce          = 20 + (Math.random() * 20);
  const countIllumination  = 20 + (Math.random() * 20);
  const windDirection      = getWindDirection(Math.random());

  const isCeilingGreenhouseOpen  = (Math.random() > 0.5) ? true : false;
  const isWallGreenhouseOpen     = (Math.random() > 0.5) ? true : false;
  // const isAtDaytime              = (Math.random() > 0.5) ? true : false;
  // const isRaining                = (Math.random() > 0.5) ? true : false;
  // const canPhotosynthesisImprove = (Math.random() > 0.5) ? true : false;
  const isAtDaytime              = (Math.random() > 0.1) ? true : false;
  const isRaining                = (Math.random() > 0.1) ? true : false;
  const canPhotosynthesisImprove = (Math.random() > 0.1) ? true : false;

  const message = new Message(JSON.stringify({
    sensorId, roomTemperature, airHumidity,
    groundHumidity, litrePerMeterWater, windForce,
    countIllumination, windDirection, isRaining,
    isCeilingGreenhouseOpen, isWallGreenhouseOpen,
    isAtDaytime, canPhotosynthesisImprove
  }));

  console.log('Sending message: ' + message.getData());
  try {
    await client.sendEvent(message);
    console.log('message sent');
  } catch (error) {
    console.error('send error: ' + error.toString());
  }
}, process.env.TIME_INTERVAL || 30000);
