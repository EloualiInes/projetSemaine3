const express = require('express');
const { getStatsSexe, getStatsAge, getStatsClass } = require('../controllers/passengers.controllers');
const router = express.Router();

router.get('/sexe', getStatsSexe);
router.get('/age', getStatsAge);
router.get('/class', getStatsClass);

module.exports = router