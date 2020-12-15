const express = require('express');
const {
  auth,
  signup,
  createAccount,
  findAccount,
  getAccount,
  transferFunds,
} = require('../controllers');
const { withAuth, withPrivilege } = require('../utils/middlewares');

const router = express.Router();

router.post('/auth', auth);

router.use(withAuth);
router.post('/account/create', createAccount);
router.post('/account/get', getAccount);
router.post('/account/search', findAccount);
router.post('/account/transfer', transferFunds);

router.post('/signup', withPrivilege, signup);

module.exports = router;
