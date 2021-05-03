const CosmosClient = require("@azure/cosmos").CosmosClient;

const { config } = require('../../config-cosmos');
const { endpoint, key, databaseId, containerId } = config;

const client = new CosmosClient({ endpoint, key });

const database = client.database(databaseId);
const container = database.container(containerId);

const getAllEventFromCosmos = async () => {
  const querySpec = {
    query: `SELECT * FROM c`
  };
  const { resources: items } = await container.items.query(querySpec).fetchAll();
  return items;
}

const getEventFromCosmos = async (sensorId) => {
  const querySpec = {
    query: `SELECT * FROM c WHERE c.sensorId = '${sensorId}'`
  };
  const { resources: items } = await container.items.query(querySpec).fetchAll();
  return items;
}

module.exports = {
  getEventFromCosmos, getAllEventFromCosmos
};
