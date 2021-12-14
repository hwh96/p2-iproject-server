const router = require('express').Router();
const Controller = require('../controllers/ball-controller')

router.get('/standing', Controller.getStandings)

module.exports = router