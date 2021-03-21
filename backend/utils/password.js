const crypto = require('crypto');

const setPassword = (password = '', saltUser = null) => {     
    // Creating a unique salt for a particular user 
    const salt = (saltUser === null) ? crypto.randomBytes(16).toString('hex') : saltUser;
    
    // Hashing user's salt and password with 1000 iterations
    const hash = crypto.pbkdf2Sync(
        password, salt, 1000, 64, 'sha512'
    ).toString('hex');

    return (password === '') ? null : {
        hash, salt
    };
};

const validPassword = (password, salt, hash) => { 
    return hash === crypto.pbkdf2Sync(
        password, salt, 1000, 64, `sha512`
    ).toString(`hex`); 
}; 


module.exports = {
    setPassword, validPassword
}