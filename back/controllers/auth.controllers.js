const User = require('../models/user.models');
const jwt = require('jsonwebtoken');

checkToken = async (req, res) => {
    const token = req.headers['x-access-token'];
    if (token === undefined) {
        res.status(404).json({ data: { msg: "Token not found" } });
        return;
    } else {
        jwt.verify(token, process.env.SECRET, (err, decode) => {
            if (err) {
                res.status(401).json({ data: { msg: "invalid token" } });
                return;
            } else
                req.body._id = decode.id;
        })
    }
    const _id = req.body._id;
    const user = await User.find({ _id });
    res.json({ status: 200, data: { msg: "valid token", user: user[0] } })
}

module.exports = { checkToken }