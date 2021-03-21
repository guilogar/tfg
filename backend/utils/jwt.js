const jwt = require('jsonwebtoken');

const generateToken = (username, salt, time = null) => {
    const token = (time !== null) ? 
        jwt.sign({
            data: username,
            exp: time,
        }, salt) :
        jwt.sign(username, salt);

    return {
        token, time
    };
}

const verifyToken = (username, salt, token) => {
    return username === jwt.verify(token, salt).data;
}

module.exports = {
    generateToken, verifyToken
}