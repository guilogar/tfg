const args = process.argv.slice(2);
process.env.ENVFILE = (args[0]) ? args[0] : '.env';

const dotenv = require('dotenv');
dotenv.config({ path: process.env.ENVFILE });

const {
    rebuildTables,
    truncateTables,
    insertDataTable
} = require('./insertData');

(async () => {
    await rebuildTables();
    await truncateTables();
    await insertDataTable();
})();