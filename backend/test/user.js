const axios = require('axios').default;
const { createUser } = require('../routes/services/create-user');
const { removeUser } = require('../routes/services/remove-user');

const timeout = 1000000;
const baseURL = 'http://localhost:3000/api/v1';
const localServer = axios.create({
  baseURL: baseURL,
  timeout: timeout,
});

const testUser = {
  username: 'testing',
  password: 'testing',
  fullname: 'Guillermo López García'
};

describe('create user', function() {
  it('create correct user', async () => {
    const user = await createUser(
      testUser.username,
      testUser.password,
      testUser.fullname
    );
    console.log(user);
  }).timeout(timeout);

  it('login correct user', async () => {
    const login = (await localServer.post('/login', {
      username: testUser.username,
      password: testUser.password,
    })).data;
    console.log(login);
  }).timeout(timeout);

  it('get correct user', async () => {
    const login = (await localServer.post('/login', {
      username: testUser.username,
      password: testUser.password,
    })).data;

    const localServerAuth = axios.create({
      baseURL: baseURL,
      timeout: timeout,
      headers: { 'Authorization': 'Bearer ' + login.token }
    });

    const user = (await localServerAuth.get('/user/fullname', {
      params: {
        username: testUser.fullname
      }
    })).data;
    console.log(user);
  }).timeout(timeout);

  it('destroy correct user', async () => {
    const confirm = await removeUser(testUser.username);
    console.log(confirm);
  }).timeout(timeout);
});
