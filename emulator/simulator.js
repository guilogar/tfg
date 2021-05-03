// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
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

// Create a message and send it to the IoT hub every second
setInterval(async () => {
  // Simulate telemetry.
  const temperature = 20 + (Math.random() * 15);
  const humidity = 60 + (Math.random() * 20);
  const sensorId = parseInt(1  + (Math.random() * 100));

  const message = new Message(JSON.stringify({
    sensorId: sensorId,
    temperature: temperature,
    humidity: humidity
  }));

  // Add a custom application property to the message.
  // An IoT hub can filter on these properties without access to the message body.
  message.properties.add('temperatureAlert', (temperature > 30) ? 'true' : 'false');
  console.log('Sending message: ' + message.getData());
  // Send the message.

  try {
    await client.sendEvent(message);
    console.log('message sent');
  } catch (error) {
    console.error('send error: ' + error.toString());
  }
}, 30000);
