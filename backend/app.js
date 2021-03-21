const express = require('express');
const app = express();
const logger = require('morgan');
const http = require('http');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const baseAPI = '/api/v1';
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));

const users = require('./routes/users');

app.use(baseAPI, users);

const server = http.createServer(app);

server.listen(PORT, function() {
    console.log('Server up and running on localhost:' + PORT);
});