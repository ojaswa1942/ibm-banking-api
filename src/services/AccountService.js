class AccountService {
  static createAccount = async (args, context) => {

  };

  static getInformationByNumber = async (args, context) => {
    const { accountNumber } = args;
    const { models, logger, userEmail } = context;

    const { Account } = models;

    const authUser = await db.collection(`auth`).findOne({ username });
    if (authUser) return { success: false, error: `User already exists` };

    const hash = await bcrypt.hash(password, 10);

    await db.collection(`auth`).insertOne({ username, password: hash });

    logger({ type: `warning` }, `[SIGNUP]`, { username, by: userEmail });

    return { success: true, body: { message: 'Signed up' } };
  };


  static findAccounts = async (args, context) => {
    // find by name or email
  };

  static transferFunds = async (args, context) => {
    // transaction
  };

}

module.exports = AccountService;
