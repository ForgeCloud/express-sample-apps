# Express Sample Apps

## Overview

This is a sample Node.js application that authenticates with an OAuth provider using [openid-client](https://www.npmjs.com/package/openid-client).

## Setup

First, create a web app in your ForgeRock SaaS adminstration UI (or via the API). Set the following [configuration](#redirect_uris):

- Login Redirect URL Whitelist: `http://localhost:9080/callback http://localhost:9080/callback/non-hosted`
- Logout Redirect URL Whitelist: `http://localhost:9080`

Click the **Create Application** button. **Be sure to capture the generated secret,** since it is unrecoverable and will not be shown again.

Now install dependencies and run this sample application:

```bash
npm i
sh start.sh {tenant name} {client id} {secret} {id token signing alg}

# Example
sh start.sh pebble-bank e93410c06d2b35813316f235f8ab015e THJ/jHzaXVA1THKyIZQ9JRKA0YGzFYK2t5n//usAb/4= RS256
```

## Optional Docker Setup

To run app-sdk in a [docker container](https://docs.docker.com/install/).

- Install & ensure [docker](https://docs.docker.com/install/) is running on your machine.
- Create a `.env` file at the root of the project, and copy the environment variables seen in `.env.example` using your project values.
- Build & run the project.

```
docker-compose up
```

- Access the app at: http://localhost:9080

![Screenshot Example](https://raw.githubusercontent.com/ForgeCloud/app-sdk/810-authcode/example.png)

## Hosted vs Non-Hosted Sign In

Use the hosted-signin flow for redirecting users to a hosted webpage where credentials are entered for an oauth code which your app exchanges for the `access_token`. In the non-hosted flow _you_ collect user credentials within your app interface without redirection, submit to our REST endpoint `/authenticate` for the user's `id_token`, and complete the oauth steps using additional params `id_token=<USER_ID_TOKEN>` `decision=allow` as well as an your openam cookie `iPlanetDirectoryPro=<USER_ID_TOKEN>` during the authorize step.

HTTP /authenticate example

```
curl -X POST \
  https://gogogames.com/json/realms/root/authenticate \
  -H 'Accept-API-Version: resource=2.0, protocol=1.0' \
  -H 'Content-Type: application/json' \
  -H 'X-OpenAM-Password: <USER_USERNAME>' \
  -H 'X-OpenAM-Username: <USER_PASSWORD>'

// RESPONSE
{
    "tokenId": "ogQYfsdfGF4GLVPZk.*AAJTSQACSDF389asd$DDFjkhJ$S$#N4UXlUc2ljQnpDVeexIZEw5UFD$SDFG%MAAlMKMwMQ..*",
    "successUrl": "/openam/console",
    "realm": "/"
}
```

HTTP /authorize example

```
curl -X POST \
  'https://gogogames.com/oauth2/realms/root/authorize?client_id=<YOUR_CLIENT_ID>&response_type=code&redirect_uri=<YOUR_CALLBACK>&csrf=<USER_ID_TOKEN>&scope=profile&decision=allow' \
  -H 'Cookie: iPlanetDirectoryPro=<USER_ID_TOKEN>;'

// RESPONSE
{
    "code": "rgH$6sWUe81nFD$4hudYiMifQ",
    "scope": "profile",
    "iss": "https://openam-<YOUR_TENANT>.forgeblocks.com/oauth2",
    "client_id": "<YOUR_CLIENT_ID>"
}
```

## Configuration

| Environment Variable | Default                                     |
| -------------------- | ------------------------------------------- |
| CLIENT_ID            | None                                        |
| CLIENT_SECRET        | None                                        |
| ORG_GATEWAY_URL      | http://localhost:8086                       |
| HOST                 | app.example.com                             |
| OAUTH_ISSUER         | https://openam-example.com/oauth2           |
| OAUTH_SCOPES         | openid profile api.forgecloud.com:user.read |

## Troubleshooting

- if your authorize request fails w/ a blank page and a `main-authorize.js` 404 error in the network console, double check that you've correctly added the callback uris to your oauth client app.
