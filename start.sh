export CLIENT_ID=$2
export CLIENT_SECRET=$3
export HOST=localhost
export ID_TOKEN_SIGNING_ALGORITHM=$4
export OAUTH_ISSUER=https://openam-$1.forgeblocks.com/am/oauth2
export OAUTH_SCOPES="openid me.read"
export API_URL=https://api-$1.forgeblocks.com
export TENANT=$1

echo Starting sample application...
npm start
