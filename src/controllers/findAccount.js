const AccountService = require('../services/AccountService');
const { stripScriptTags } = require('../utils/helpers');

const findAccount = async (req, res) => {
  try {
    let { email = '', name = '' } = req.body;
    [email, name] = stripScriptTags(email, name);
    if (!email && !name) {
      return res.status(400).json('Atleast one of account name or email is required to find');
    }

    const serviceRes = await AccountService.findAccounts({ email, name }, req.context);
    if (serviceRes.success) {
      return res.status(200).json(serviceRes.body);
    }
    return res.status(400).json(`${serviceRes.error}`);
  } catch (error) {
    req.context.logger({ type: `error` }, `Error while handling account/find controller:`, error);
    return res.status(500).json('Something went wrong!');
  }
};

module.exports = findAccount;
