const express = require('express');
const { auth, signup } = require('../controllers');
const { withAuth, withPrivilege } = require('../utils/middlewares');

const router = express.Router();

router.post('/auth', auth);

router.use(withAuth);

router.post('/signup', withPrivilege, signup);

module.exports = router;
