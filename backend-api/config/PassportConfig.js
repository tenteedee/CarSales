import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import Customer from '../models/Customer.js';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, API_PORT } from './Config.js';

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `localhost:${API_PORT}/api/shop/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let customer = await Customer.findOne({
          where: { email: profile.emails[0].value },
        });

        if (!customer) {
          customer = await Customer.create({
            fullname: profile.displayName,
            email: profile.emails[0].value,
            password: null,
            phone_number: null,
            address: null,
            date_of_birth: null,
          });
        }

        done(null, customer);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

passport.serializeUser((customer, done) => {
  done(null, customer.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const customer = await Customer.findByPk(id);
    done(null, customer);
  } catch (err) {
    done(err, false);
  }
});

export default passport;
