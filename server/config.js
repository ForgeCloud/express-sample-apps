const {
  CLIENT_ID,
  CLIENT_SECRET,
  HOST = 'app.example.com',
  ID_TOKEN_SIGNING_ALGORITHM = 'RS256',
  OAUTH_ISSUER = 'https://openam-example.com/oauth2',
  OAUTH_SCOPES = 'openid me.read',
  API_URL = 'http://localhost:8086',
  PORT = 9080,
  PROTOCOL = 'http',
  TENANT = '',
} = process.env;

const BASE_URL = `${PROTOCOL}://${HOST}${PORT == 80 ? '' : `:${PORT}`}`;
const CALLBACK_HOSTED = `${BASE_URL}/hosted/callback`;
const CALLBACK_NON_HOSTED = `${BASE_URL}/custom/callback`;
const OPEN_AM = `https://openam-${TENANT}.forgeblocks.com`;

module.exports = {
  BASE_URL,
  CALLBACK_HOSTED,
  CALLBACK_NON_HOSTED,
  CLIENT_ID,
  CLIENT_SECRET,
  HOST,
  ID_TOKEN_SIGNING_ALGORITHM,
  OAUTH_ISSUER,
  OAUTH_SCOPES,
  OPEN_AM,
  API_URL,
  PORT,
  PROTOCOL,
  TENANT,
};
