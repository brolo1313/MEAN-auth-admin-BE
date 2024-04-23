const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        maxlength: 50,
        trim: true,
        required: true
    },
    role: {
        type: String,
      },
    title: {
        type: String,
        trim: true,
        maxlength: 100,
    },
    bio: {
        type: String,
        trim: true,
        maxlength: 500,
    },
    profilePics: String,
    links: {
        website: {
            type: String,
            trim: true
        },
        facebook: String,
        twitter: String,
        github: String
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Plan'
        }
    ],
}, {
    timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile