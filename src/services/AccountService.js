class AccountService {
  static createAccount = async (args, context) => {
    const { name, email } = args;
    const { models, logger, userEmail } = context;

    const { Account } = models;
    const account = await Account.findOne({ email });
    if (account) return { success: false, error: 'Account with same email already exists' };

    const res = await Account.create({ name, email });

    logger({ type: `warning` }, `[CREATE_ACCOUNT]`, res.number, `by ${userEmail}`);
    return { success: true, body: { message: 'Created new account', account: res } };
  };

  static getInformationByNumber = async (args, context) => {
    const { accountNumber } = args;
    const { models, logger, userEmail } = context;

    const { Account } = models;

    const account = await Account.findOne({ number: accountNumber });
    if (!account) return { success: false, error: `Invalid Account Number` };

    logger({ type: `warning` }, `[GET_ACCOUNT]`, account.number, `by ${userEmail}`);
    return { success: true, body: { message: 'Successfully fetched account details', account } };
  };

  // static findAccounts = async (args, context) => {
  //   // find by name or email
  // };

  // static transferFunds = async (args, context) => {
  //   // transaction
  // };
}

module.exports = AccountService;
