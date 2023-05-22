const express = require('express');
const router = express.Router();
const { checkToken } = require('../controllers/auth.controllers');

router.get('/checkToken', checkToken);

module.exports = router