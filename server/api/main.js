import Express from 'express'

import {responseClient} from '../utils'

const router = Express.Router();

router.use('/user', require('./user'));

module.exports = router;
