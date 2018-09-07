const Auth0Strategy = require('passport-auth0');

module.exports = new Auth0Strategy(
  {
    domain: process.env.DOMAIN,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    scope: 'openid profile email',
    callbackURL: '/login'
  },
  (accessToken, refreshToken, extraParams, profile, done) => {
    // Profile = data from Auth0
    return done(null, profile);
  }
);