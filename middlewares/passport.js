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
//       console.log("profile", profile);
      const existingEmail = await User.findOne({ email: profile.email });
//       console.log('existingEmail', existingEmail);
      if (existingEmail) {
        return done(null, { error: "Email already exists, try login with name and password" });
      }

      if(!existingEmail) {
        //create user
        //new User model or separate model create????
      }
    
      return done(null, profile);
    }
  )
);
