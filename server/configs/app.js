const dotenv = require('dotenv');

dotenv.config();

const appConfig = {
    env: process.env.APP_ENV || 'development',
    expressPort: process.env.EXPRESS_PORT || 3000,
    secret: process.env.APP_SECRET || 'YOU_SHOULD_NOT_USE_THIS_SECRET',
    cookie: process.env.COOKIE_KEY

}

module.exports = appConfig;