const express = require('express');
const { getStatsSexe, getStatsAge, getStatsClass, searchPassengers } = require('../controllers/passengers.controllers');
const router = express.Router();

router.get('/sexe', getStatsSexe);
router.get('/age', getStatsAge);
router.get('/class', getStatsClass);
router.post('/search', searchPassengers);

module.exports = router