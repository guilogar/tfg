const dotenv = require('dotenv');
dotenv.config();

const { renewal, rebuildTables, removeUsers, removeAuths, insertUsers } = require('./insertData');

(async () => {
    await rebuildTables();
    await removeUsers();
    await removeAuths();
})();