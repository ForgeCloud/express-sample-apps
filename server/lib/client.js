const { CLIENT_ID, CLIENT_SECRET, ID_TOKEN_SIGNING_ALGORITHM } = require('../config');

let client;

module.exports = (issuer) => {
  if (!client) {
    client = new issuer.Client({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      id_token_signed_response_alg: ID_TOKEN_SIGNING_ALGORITHM,
    });
    client.CLOCK_TOLERANCE = 5;
  }
  return client;
};
