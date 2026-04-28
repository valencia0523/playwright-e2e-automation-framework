const username = process.env.SAUCE_USERNAME;
const password = process.env.SAUCE_PASSWORD;

if (!username || !password) {
  throw new Error('Missing env variables');
}

export const users = {
  standard: {
    username,
    password,
  },
  invalid: {
    username: 'invalid_user',
    password: 'secret_sauce',
  },
};
