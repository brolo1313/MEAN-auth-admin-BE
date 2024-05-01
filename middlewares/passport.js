const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/user");

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      const existingEmail = await User.findOne({ email: profile.email });
      const existingGoogleId = await User.findOne({ "google.id": profile.id });
        console.log('existingGoogleId', existingGoogleId);
      console.log('existingEmail', existingEmail);
      if (existingEmail && !existingGoogleId) {
        existingEmail.google = {
                id: profile.id,
                email: profile.email,
         };
        await existingEmail.save();
              
        return done(null, existingEmail)
      }

      if(existingEmail && existingGoogleId) {
        return done(null, existingEmail)
      }
    
      return done(null, profile);
    }
  )
);
