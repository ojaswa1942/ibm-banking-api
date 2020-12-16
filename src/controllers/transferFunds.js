const AccountService = require('../services/AccountService');
const { stripScriptTags } = require('../utils/helpers');

const findAccount = async (req, res) => {
  try {
    let { source, destination, amount } = req.body;
    [source, destination, amount] = stripScriptTags(source, destination, amount);
    amount = parseInt(amount, 10);
    source = parseInt(source, 10);
    destination = parseInt(destination, 10);

    if (!source || !destination || !amount) {
      return res.status(400).json('Source, destination and amount are required.');
    }

    const serviceRes = await AccountService.transferFunds(
      { source, destination, amount },
      req.context
    );
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
