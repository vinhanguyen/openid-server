# openid-server
Express app using passport-jwt strategy.

## Set env vars
Name | Value
-----|--------------------------
ISSUER | https://accounts.google.com
CLIENT_ID | your client id
JWKS_URI | https://www.googleapis.com/oauth2/v3/certs
MYSQL_HOST | your mysql host
MYSQL_USER | your mysql user
MYSQL_PASSWORD | your mysql password
MYSQL_DATABASE | your mysql database name

## Build database
```
npm run build-db
```

## Insert user
```
INSERT INTO users (email) VALUES ('vinh.a.nguyen@gmail.com');
```

## Start api
```
npm run start
```
