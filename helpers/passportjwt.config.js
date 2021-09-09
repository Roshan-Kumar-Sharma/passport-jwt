const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const { env } = require("../configs/secret");

/* options is an object literal containing options to control how the token is extracted from the request or verified.

secretOrKey is a string or buffer containing the secret (symmetric) or PEM-encoded public key (asymmetric) for verifying the token's signature. REQUIRED unless secretOrKeyProvider is provided

*************************
jwtFromRequest (REQUIRED) Function that accepts a request as the only parameter and returns either the JWT as a string or null. See Extracting the JWT from the request for more details.
*************************

issuer: If defined the token issuer (iss) will be verified against this value.

audience: If defined, the token audience (aud) will be verified against this value.

*************************
passReqToCallback: If true the request will be passed to the verify callback. i.e. verify(request, jwt_payload, done_callback).
*************************

More at http://www.passportjs.org/packages/passport-jwt/

*/

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.JWT_ACCESS_TOKEN_SECRET,
    issuer: "codewithroshan.com",
};

const verifyCallback = (payload, done) => {
    return done(null, payload);
};

// passport middlware name jwtVerify to verify json token

passport.use("jwtVerify", new JwtStrategy(options, verifyCallback));
