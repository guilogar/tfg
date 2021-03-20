const crypto = require('crypto');

const setPassword = (password = '') => {     
    // Creating a unique salt for a particular user 
    const salt = crypto.randomBytes(16).toString('hex'); 
    
    // Hashing user's salt and password with 1000 iterations
    const hash = crypto.pbkdf2Sync(
        password, salt, 1000, 64, 'sha512'
    ).toString('hex');

    return (password === '') ? null : {
        salt, hash
    };
}; 
    
// Method to check the entered password is correct or not 
const validPassword = (password, hash, salt) => { 
    const newHash = crypto.pbkdf2Sync(
        password, salt, 1000, 64, 'sha512'
    ).toString('hex'); 

    return hash === newHash;
};

module.exports = {
    setPassword, validPassword
}