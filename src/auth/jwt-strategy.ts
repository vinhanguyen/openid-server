import { createRemoteJWKSet, jwtVerify } from "jose";
import { Strategy } from "passport-custom";
import { createFederatedCredential, createUser, getFederatedCredential, getUser } from "./dao";

export function jwtStrategy(issuer: string, audience: string, jwks_uri: string) {
  const JWKS = createRemoteJWKSet(new URL(jwks_uri));

  return new Strategy(
    async function(req, done) {
      // get id token from header
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return done(null, false);
      }

      const match = authHeader.match(/Bearer (.+)/);
      if (!match) {
        return done(null, false);
      }
  
      const jwt = match[1];
      try { // verify token
        const { payload, protectedHeader } = await jwtVerify(jwt, JWKS, {
          issuer,
          audience,
        });

        // get user
        try {
          const {iss = null, sub = null, name = null} = payload;
  
          if (!(iss && sub && name)) {
            return done('Missing payload');
          }
  
          const cred: any = await getFederatedCredential(iss, sub);

          if (!cred) {
            const user: any = await createUser(<string>name);
            await createFederatedCredential(user.id, iss, sub);
            return done(null, user);
          } else {
            const user = await getUser(cred.user_id);
            if (!user) { return done(null, false); }
            return done(null, user);
          }
        } catch (e) { // db error
          return done(e);
        }
      } catch (e) { // verify failed
        return done(null, false);
      }
    }
  );
}
