const AccountService = require('../services/AccountService');
const { stripScriptTags } = require('../utils/helpers');

const createAccount = async (req, res) => {
  try {
    let { name, email } = req.body;
    [name, email] = stripScriptTags(name, email);
    if (!name || !email) {
      return res
        .status(400)
        .json('Name and email are required. Defaults(Account=Saving, Opening Balance=25000)');
    }

    const serviceRes = await AccountService.createAccount({ name, email }, req.context);
    if (serviceRes.success) {
      return res.status(200).json(serviceRes.body);
    }
    return res.status(400).json(`${serviceRes.error}`);
  } catch (error) {
    req.context.logger({ type: `error` }, `Error while handling account/create controller:`, error);
    return res.status(500).json('Something went wrong!');
  }
};

module.exports = createAccount;
