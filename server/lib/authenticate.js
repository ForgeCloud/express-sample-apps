const btoa = require('btoa');
const fetch = require('node-fetch');
const { URLSearchParams } = require('url');

const parseResponse = require('./parse-response');
const { OPEN_AM, CLIENT_ID, CLIENT_SECRET } = require('../config');

module.exports = { authenticate, getAppAccessToken };

function authenticate(username, password) {
  return fetch(`${OPEN_AM}/am/json/realms/root/authenticate`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept-Api-Version': 'resource=2.0, protocol=1.0',
      'Content-Type': 'application/json',
      'X-Openam-Password': password,
      'X-Openam-Username': username,
    },
  })
    .then(parseResponse)
    .then(({ payload }) => payload)
    .catch((err) => {
      throw err;
    });
}

function getAppAccessToken(scope) {
  const clientCredentials = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
  const host = OPEN_AM.split('//')[1];
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('scope', scope);

  return fetch(`${OPEN_AM}/am/oauth2/access_token`, {
    body: params,
    headers: {
      'Accept-Api-Version': 'resource=2.0, protocol=1.0',
      Authorization: `Basic ${clientCredentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      Host: host,
    },
    method: 'POST',
  })
    .then(parseResponse)
    .then(({ payload }) => payload)
    .catch((err) => {
      console.log('access token err:', err);
      throw err;
    });
}
