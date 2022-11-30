import { decode } from 'jsonwebtoken';
import JwksClient, { SigningKey } from "jwks-rsa";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import { getUser } from "./dao";

export function jwtStrategy(issuer: string, audience: string, jwksUri: string) {
  const client = JwksClient({jwksUri});
  const keyCache: SigningKey[] = [];

  const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    issuer,
    audience
  };
  
  opts.secretOrKeyProvider = async (request, rawJwtToken, done) => {
    const {header: {kid}}: any = decode(rawJwtToken, {complete: true});

    const found = keyCache.find(({kid: cacheKid}) => cacheKid === kid);
    if (found) {
      done(null, found.getPublicKey());
      return;
    }

    const key = await client.getSigningKey(kid);
    if (key) {
      keyCache.push(key);
      done(null, key.getPublicKey());
      return;
    }

    done('No key');
  };

  return new Strategy(opts, async (payload, done) => {
    const {email} = payload;

    try {
      const user: any = await getUser(email);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (e) {
      return done(e);
    }
  });
}
