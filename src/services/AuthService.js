const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secrets } = require('../utils/config');

class AuthService {
  static login = async (args, context) => {
    const { username, password } = args;
    const { logger, models } = context;
    const { Admin } = models;

    const authUser = await Admin.findOne({ username });
    if (!authUser) return { success: false, error: `Incorrect Credentials` };

    const match = await bcrypt.compare(password, authUser.password);
    if (!match) return { success: false, error: `Incorrect Credentials` };

    const payload = {
      userEmail: username,
    };
    const token = jwt.sign(payload, secrets.jwt, {
      expiresIn: '10d',
    });

    logger(`[LOGIN]`, payload.userEmail);

    return { success: true, body: { message: 'Logged in', token } };
  };

  static signup = async (args, context) => {
    const { username, password } = args;
    const { models, logger, userEmail } = context;
    const { Admin } = models;

    const authUser = await Admin.findOne({ username });
    if (authUser) return { success: false, error: `User already exists` };

    const hash = await bcrypt.hash(password, 10);

    await Admin.create({ username, password: hash });

    logger({ type: `warning` }, `[SIGNUP]`, username, `by: ${userEmail}`);

    return { success: true, body: { message: 'Signed up' } };
  };
}

module.exports = AuthService;
