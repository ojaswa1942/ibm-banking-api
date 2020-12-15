const express = require('express');
const { auth } = require('../controllers');
// const { withAuth, withPriviledge } = require("../utils/middlewares");

const router = express.Router();

router.post('/auth', auth);

module.exports = router;
