const passport = require('passport')
const passportJwt = require('passport-jwt')

const { ExtractJwt, Strategy } = passportJwt
const { JWT_SECRET_KEY } = process.env

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET_KEY
}

const jwtAuth = new Strategy(jwtOptions, (payload, done) => {
  if(payload.sub === "admin") {
    done(null, true)
  } else {
    done(null, false)
  }
})

passport.use(jwtAuth)

const requireJwtAuth = passport.authenticate('jwt', { session: false })

module.exports = requireJwtAuth
