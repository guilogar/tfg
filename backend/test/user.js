const assert = require('assert');
const axios = require('axios').default;

const timeout = 1000000;
const localServer = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    timeout: timeout,
});

const testUser = {
    username: 'test',
    password: 'test',
    fullname: 'Guillermo López García'
};

describe('create user', function() {
    it('create correct user', async () => {
        const user = (await localServer.post('/user', {
            username: testUser.username,
            password: testUser.password,
            fullname: testUser.fullname,
        })).data;
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
            baseURL: 'http://localhost:3000/api/v1',
            timeout: timeout,
            headers: { 'Authorization': 'Bearer ' + login.token }
        });

        const user = (await localServerAuth.get('/user', {
            params: {
                username: testUser.username
            }
        })).data;
        console.log(user);
    }).timeout(timeout);

    it('destroy correct user', async () => {
        const login = (await localServer.post('/login', {
            username: testUser.username,
            password: testUser.password,
        })).data;

        const localServerAuth = axios.create({
            baseURL: 'http://localhost:3000/api/v1',
            timeout: timeout,
            headers: { 'Authorization': 'Bearer ' + login.token }
        });

        const confirm = (await localServerAuth.delete(
            `/user/${testUser.username}`
        )).data;
        console.log(confirm);
    }).timeout(timeout);
});