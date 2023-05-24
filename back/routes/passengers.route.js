const express = require('express');
const { getStatsSexe, getStatsAge, getStatsClass,getStatsSurvived, searchPassengers } = require('../controllers/passengers.controllers');
const router = express.Router();

router.get('/sexe', getStatsSexe);
router.get('/age', getStatsAge);
router.get('/class', getStatsClass);
router.get('/survived', getStatsSurvived);
router.post('/search', searchPassengers);

module.exports = router