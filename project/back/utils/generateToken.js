const jwt = require('jsonwebtoken');

module.exports = (payload) => {
    const token = jwt.sign(payload,"10team");
    console.log("token : ", token)
    return token
}