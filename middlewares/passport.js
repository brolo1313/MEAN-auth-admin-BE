const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const Profile = require("../models/profile");
const sendEmail = require("../utils/sendEmail");



passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.GOOGLE_CALLBACK_URL_DEV,
//       passReqToCallback: true,
//     },
//     async function (request, accessToken, refreshToken, profile, done) {
//       const existingUserByEmail = await User.findOne({ email: profile.email });
//       const existingUserByGoogleId = await User.findOne({
//         "google.id": profile.id,
//       });

//       if (existingUserByEmail && !existingUserByGoogleId) {
//         existingUserByEmail.google = {
//           id: profile.id,
//           email: profile.email,
//         };
//         await existingUserByEmail.save();

//         return done(null, existingUserByEmail);
//       }

//       if (!existingUserByEmail && !existingUserByGoogleId) {
//         // create new User by google id and email
//         const newUser = new User({
//           username: "newUser",
//           email: profile.email,
//           password: bcrypt.hashSync(process.env.DEFAULT_PASSWORD, 8),
//           role: "user",
//           google: {
//             id: profile.id,
//             email: profile.email,
//           },
//         });

//         await newUser.save();

//         const newProfile = new Profile({
//           user: newUser._id,
//           name: newUser.username,
//           title: "",
//           bio: "",
//           role: newUser.role,
//           profilePics: "",
//           links: {
//             website: "",
//             facebook: "",
//             twitter: "",
//             github: "",
//           },
//           posts: [],
//         });

//         const createdProfile = await newProfile.save();

//         await User.findOneAndUpdate(
//           { _id: newUser._id },
//           { $set: { profile: createdProfile._id } }
//         );

//         await sendEmail(
//           newUser.email,
//           "Your credentials",
//           process.env.DEFAULT_PASSWORD,
//           newUser.username
//         );

//         return done(null, newUser);
//       }

//       if (existingUserByEmail && existingUserByGoogleId) {
//         return done(null, existingUserByEmail);
//       }

//       return done(null, profile);
//     }
//   )
// );
