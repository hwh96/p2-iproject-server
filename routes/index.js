const router = require('express').Router();
const user = require('./user');
const schedule = require('./schedule');
const footballClub = require('./footballClub');
const fans = require('./fans');
const post = require('./post');
const football = require('./football');
const {authentication} = require('../middlewares/middelware')

router.use('/users', user);
router.use('/fans', fans);
router.use('/post', post);
router.use('/baller', football)

router.use('/clubs', footballClub);

router.use(authentication);
router.get('/match', )

router.use('/schedules', schedule);

module.exports = router;