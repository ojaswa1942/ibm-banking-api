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

  static findAccounts = async (args, context) => {
    const { email, name } = args;
    const { models, logger, userEmail } = context;

    const { Account } = models;

    const accounts = await Account.find({
      email: { $regex: email, $options: 'i' },
      name: { $regex: name, $options: 'i' },
    });

    logger(
      { type: `warning` },
      `[FIND_ACCOUNTS]`,
      `using email: ${email} and name: ${name}`,
      `by ${userEmail}`
    );
    return { success: true, body: { message: 'Successfully fetched account details', accounts } };
  };

  static transferFunds = async (args, context) => {
    const { source, destination, amount } = args;
    const { models, logger, userEmail } = context;
    const { Account } = models;

    const sourceAccount = await Account.findOne({ number: source });
    if (!sourceAccount) return { success: false, error: `Invalid source account` };
    const destinationAccount = await Account.findOne({ number: destination });
    if (!destinationAccount) return { success: false, error: `Invalid destination account` };

    if (sourceAccount.balance < amount)
      return { success: false, error: `Insufficient balance in Source Account` };

    const session = await Account.startSession();
    try {
      await session.withTransaction(async () => {
        const sRes = await Account.updateOne(
          { number: source },
          { $inc: { balance: -1 * amount } },
          { session }
        );
        if (!sRes.nModified) throw new Error(`Source A/c could not modified, transaction failed`);

        const dRes = await Account.updateOne(
          { number: destination },
          { $inc: { balance: amount } },
          { session }
        );
        if (!dRes.nModified)
          throw new Error(`Destination A/c could not modified, transaction failed`);
      });
    } catch (e) {
      logger({ type: `error` }, `[TRX_FAILED]`, e);
      return {
        success: false,
        error: 'Transaction could not be processed. Please try again later.',
      };
    }

    session.endSession();
    logger(
      { type: `warning` },
      `[TRANSFER_FUNDS]`,
      `${source} -> ${destination} (Rs. ${amount}).`,
      `by ${userEmail}`
    );
    return { success: true, body: { message: 'Transaction successful' } };
  };
}

module.exports = AccountService;
