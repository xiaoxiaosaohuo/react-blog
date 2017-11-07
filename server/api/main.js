import Express from 'express'

import {responseClient} from '../utils'

const router = Express.Router();

router.use('/user', require('./user'));
router.use('/article', require('./article'));
module.exports = router;
