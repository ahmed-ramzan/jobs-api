const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors/index')

const auth = async function (req, res, next) {
    // check header
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Credentials Invalid')
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        // attach the user to job routes
        req.user = {userId: payload.userId, name: payload.name}
        next()
    } catch (e) {
        throw new UnauthenticatedError('Credentials Invalid')
    }
}

module.exports = auth