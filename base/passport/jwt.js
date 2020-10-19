const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const { config } = require('../../config');

const opts = {
    secretOrKey: config.key(),
    jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromUrlQueryParameter('acces_token'),
    ]),
};

module.exports = new JwtStrategy(opts, (jwt_payload, done) => {
    done(null, jwt_payload);
});