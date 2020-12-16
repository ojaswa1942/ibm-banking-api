const AccountService = require('../services/AccountService');
const { stripScriptTags } = require('../utils/helpers');

const findAccount = async (req, res) => {
  try {
    let { accountNumber } = req.body;
    [accountNumber] = stripScriptTags(accountNumber);
    if (!accountNumber) {
      return res.status(400).json('Account Number is required');
    }

    const serviceRes = await AccountService.login({ accountNumber }, req.context);
    if (serviceRes.success) {
      return res.status(200).json(serviceRes.body);
    }
    return res.status(400).json(`${serviceRes.error}`);
  } catch (error) {
    req.context.logger({ type: `error` }, `Error while handling account/get controller:`, error);
    return res.status(500).json('Something went wrong!');
  }
};

module.exports = findAccount;
