const jwt = require('jsonwebtoken');

module.exports = (payload) => {
    jwt.sign(payload,"10team")
}