import express, {} from 'express';
import { router } from './router';
import cors from 'cors';
import passport from 'passport';
import { jwtStrategy } from './auth/strategy';

const issuer = process.env.ISSUER;
const client_id = process.env.CLIENT_ID;
const jwks_uri = process.env.JWKS_URI;

if (!(issuer && client_id && jwks_uri)) {
  throw 'Missing ISSUER, CLIENT_ID, JWKS_URI env vars';
}

passport.use(jwtStrategy(issuer, client_id, jwks_uri));

const app = express();
const port = process.env.PORT;

app.use(cors());

app.use('/', passport.authenticate('jwt', { session: false }), router);

app.listen(port, () => {
  console.log(`openid-server listening at http://localhost:${port}`);
});
