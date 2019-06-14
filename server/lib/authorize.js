const fetch = require('node-fetch');

const parseResponse = require('./parse-response');
const {
  CALLBACK_HOSTED,
  CALLBACK_NON_HOSTED,
  OAUTH_SCOPES,
} = require('../config');

module.exports = (oidcClient) => {
  return {
    callback,
    hosted,
    nonHosted,
  };

  function hosted(res) {
    const authUrl = oidcClient.authorizationUrl({
      claims: {
        id_token: { email_verified: null },
        userinfo: { sub: null, email: null },
      },
      redirect_uri: CALLBACK_HOSTED,
      scope: OAUTH_SCOPES,
    });
    res.redirect(authUrl);
  }

  function nonHosted(tokenId) {
    const authUrl = oidcClient.authorizationUrl({
      redirect_uri: CALLBACK_NON_HOSTED,
      scope: OAUTH_SCOPES,
      decision: 'allow',
      csrf: tokenId,
    });

    return fetch(authUrl, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Cookie: `iPlanetDirectoryPro=${tokenId};`,
      },
    })
      .then(parseResponse)
      .then(({ payload }) => payload)
      .catch((err) => {
        console.log('authorize err:', err);
        throw err;
      });
  }

  async function callback(callbackUrl, payload) {
    return oidcClient.authorizationCallback(callbackUrl, payload);
  }
};
