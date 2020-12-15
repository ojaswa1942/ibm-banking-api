const auth = require('./auth');
// const analyze = require('./analyze');
// const details = require('./details');
const signup = require('./signup');
const createAccount = require('./createAccount');
const findAccount = require('./findAccount');
const getAccount = require('./getAccount');
const transferFunds = require('./transferFunds');

module.exports = {
  auth,
  signup,
  createAccount,
  findAccount,
  getAccount,
  transferFunds,
};
