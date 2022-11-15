# openid-server
Express app with JWT authentication using custom Passport strategy. 

## Set env vars
Name | Value
-----|--------------------------
ISSUER | https://accounts.google.com
CLIENT_ID | your client id
JWKS_URI | https://www.googleapis.com/oauth2/v3/certs

## Create db
```
npm run create-db
```

## Start api
```
npm run start
```
