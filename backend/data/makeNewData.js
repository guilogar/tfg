const dotenv = require('dotenv');
dotenv.config();

const { renewal, rebuildTables, removeUsers, insertUsers } = require('./insertData');

(async () => {
    await rebuildTables();
    await removeUsers();
})();